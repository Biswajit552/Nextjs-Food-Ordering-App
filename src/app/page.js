import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="max-w-md mx-auto mt-4 text-gray-500 flex flex-col gap-4 ">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ex
            soluta, ducimus labore nihil eos numquam beatae, iure architecto
            iste nisi molestias sed aliquid ab esse, alias quidem fugiat
            dolorem.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ex
            soluta, ducimus labore nihil eos numquam beatae, iure architecto
            iste nisi molestias sed aliquid ab esse, alias quidem fugiat
            dolorem.
          </p>
        </div>
      </section>
      <section className="text-center mt-6">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-4">
          <a
            href="tel:+91633265765"
            className="text-3xl text-gray-500 underline"
          >
            +91 633265765
          </a>
        </div>
      </section>
    </>
  );
}
