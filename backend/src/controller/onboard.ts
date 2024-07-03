import { Request, Response } from "express";
import { Project, Section, Task, User, Workspace } from "~/model";
import { errorResponseHandler, successResponseHandler } from "~/utils";

export const createDefaultWorkspace = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (user?.onboarding?.step !== "SIGNED_UP") {
      return errorResponseHandler(res, "CONFLICT");
    }
    const workspace = await new Workspace({
      name: "My Workspace",
      admin: userId,
      personal: true,
      members: [userId],
    }).save();

    await User.findByIdAndUpdate(userId, {
      $push: { workspaces: workspace._id },
      selectedWorkspace: workspace._id,
      "onboarding.step": "WORKSPACE_CREATED",
    });
    return successResponseHandler(res, "SUCCESS", {
      workspace,
    });
  } catch (error) {
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};

export const onboardUser = async (req: Request, res: Response) => {
  try {
    const { projectName, tasks, sections } = req.body;
    console.log("req.body", req.body)
    const userId = req.user?.id;
    const user = await User.findById(userId).select("-password");
    if (!user) return errorResponseHandler(res, "NOT_FOUND");
    if (user.onboarding?.step === "COMPLETED"){
      return errorResponseHandler(res, "CONFLICT");
    }
    // let workspace = await Workspace.findOne({
    //   admin: userId,
    //   personal: true,
    // });

    // if (!workspace) {
      let workspace = await new Workspace({
        name: "My Workspace",
        admin: userId,
        personal: true,
        members: [userId],
      }).save();

      user.workspaces.push(workspace._id);
      user.selectedWorkspace = workspace._id;
      if (user.onboarding) {
        user.onboarding.step = "WORKSPACE_CREATED";
      }

      //   await User.findByIdAndUpdate(userId, {
      //     $push: { workspaces: workspace._id },
      //     selectedWorkspace: workspace._id,
      //     "onboarding.step": "WORKSPACE_CREATED",
      //   });
    // }

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    // Create project
    const project = new Project({
      name: projectName,
      admin: userId,
      workspace: workspace._id,
      color: `#${randomColor}`,
      icon: "DEFAULT",
      members: [userId]
    });

    console.log("project", project)
    console.log("tasks", tasks)

    const refractoredTask = tasks.map((task: string, index: number) => ({
      title: task,
      project: project._id,
      order: index,
      taskCreator: user._id,
      // workflow: sections[0],
    }));

    // Add tasks to the project
    const createdTasks = tasks.map((task: string, index: number) => new Task({
      title: task,
      project: project._id,
      order: index+1,
      taskCreator: user._id,
      section: null,  // Placeholder for now
    }));

    const refractoredSections = sections.map(
      (section: string, index: number) => ({
        title: section,
        project: project._id,
        order: index+1,
        tasks: index === 0 ? createdTasks.map((item: any) => item._id) : [],
      })
    );

    // Organize tasks into sections (simplified)
    // Note: Real implementation would need to associate tasks with sections more explicitly
    const createdSections = sections.map((section: string, index: number) => new Section({
      title: section,
      project: project._id,
      order: index+1,
      tasks: [],
    }));


    createdTasks.forEach((task: any) => {
      task.section = createdSections[0]._id;
      task.status = {
        sectionId: createdSections[0]._id,
        title: createdSections[0].title,
      }
    });

    // Set tasks for the first section
    createdSections[0].tasks = createdTasks.map((task:any) => task._id);

    // Save sections and tasks
    await Promise.all([...createdSections.map((section:any) => section.save()), ...createdTasks.map((task: any)=> task.save())]);


    if (user.onboarding) {
      user.onboarding.step = "COMPLETED";
      user.onboarding.done = true;
    }

    workspace.projects.push(project._id);
    const sectionIds = createdSections.map((item: any) => item._id);
    project.sections.push(...sectionIds);

    /** @dev We should use promise here */
    await project.save();
    await workspace.save();
    await user.save();
    return successResponseHandler(res, "SUCCESS", {
      user,
      workspace,
      project,
      createdSections,
      createdTasks,
    });
  } catch (error) {
    console.log("error", error)
    return errorResponseHandler(res, "SERVER_ERROR");
  }
};
