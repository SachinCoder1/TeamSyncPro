export default function Hero () {
    return (
        <div className="relative hidden h-screen select-none flex-col justify-center bg-black text-center md:flex md:w-1/2">
        <div className="mx-auto py-16 px-8 text-white xl:w-[40rem]">
          <span className="rounded-full bg-white px-3 py-1 font-medium text-blue-600">
            New Feature
          </span>
          <p className="my-6 text-3xl font-semibold leading-10">
            Create animations with{" "}
            <span className="mx-auto block w-56 whitespace-nowrap rounded-lg bg-orange-400 py-2 text-white">
              drag and drop
            </span>
          </p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
            necessitatibus nostrum repellendus ab totam.
          </p>
          <a
            href="#"
            className="font-semibold tracking-wide text-white underline underline-offset-4"
          >
            Learn More
          </a>
        </div>
        <img
          className="mx-auto w-11/12 max-w-lg rounded-lg object-cover"
          src="/images/SoOmmtD2P6rjV76JvJTc6.png"
        />
      </div>
    )
}