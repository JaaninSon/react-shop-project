import Slider from "../components/common/Slider";
import ProductsList from "../components/products/ProductsList";
import "../assets/css/card.css";

const Index = (): JSX.Element => {
  return (
    <>
      <Slider />
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto">
        <ProductsList category="패션" isMain={true} />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <ProductsList category="액세서리" isMain={true} />
      </section>
      <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
        <ProductsList category="디지털" isMain={true} />
      </section>
    </>
  );
};

export default Index;
