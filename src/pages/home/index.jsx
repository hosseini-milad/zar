/* eslint-disable react-hooks/exhaustive-deps */
const baseUrl = import.meta.env.VITE_BASE_URL;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { productList } from "@service/product.js";
import { sliders } from "@service/global.js";
import { getUser } from "@core/storageService";
import { debounce } from "lodash";
import TextField from "@mui/material/TextField";
import CarouselSlider from "./components/CarouselSlider";
import Categories from "./components/Categories";
import CategoriInline from "./components/CategoriInline";
import CategoryProduct from "./components/CategoryProduct";
import Product from "./components/product";

const Home = () => {
  let [productItems, setProductItems] = useState({});
  let [searchProduct, setSearchProduct] = useState("");
  let [catId, setCatId] = useState(null);
  const [pageCount, setPageCount] = useState(10);
  const [listSlider, setListSlider] = useState([]);

  const [productGroupCategory, setProductGroupCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const getProductsList = async () => {
    let dataModel = {
      offset: 0,
      pageSize: pageCount,
      search: searchProduct,
      category: catId,
    };
    productList(dataModel).then((response) => {
      setProductGroupCategory(response.data.categoryList);
      setSubCategories(response.data.subCategoryList);
      setProductItems({
        products: response.data.data,
        totalProducts: response.data.size,
      });
    });
  };
  const getUpdatePage = async () => {
    setPageCount(pageCount + 10);
  };
  const debouncedSearch = debounce(async (text) => {
    setSearchProduct(text.target.value);
  }, 600);

  //--------------------------------------------------
  //get slider list
  const sliderList = async () => {
    try {
      await sliders().then((response) => {
        const changeResponse = response.data.data.map((item) => {
          return {
            ...item,
            imageUrl: `${baseUrl}${item.imageUrl}`,
            thumbUrl: `${baseUrl}${item.thumbUrl}`,
          };
        });
        console.log(changeResponse)
        setListSlider(changeResponse);
      });
    } catch (error) {
      console.log(error.response.message, "slider error");
    }
  };

  //get category selected
  const getSelectedInlineCategory = (catId) => {
    setCatId(Number(catId));
  };
  //--------------------------------------------------
  const selectedCategoris = (categorySelected) => {
    if (categorySelected === "allProduct") resetFilterAllProducts();
    else setCatId(Number(categorySelected));
  };

  const resetFilterAllProducts = () => {
    setSearchProduct("");
    setCatId(null);
  };
  //--------------------------------------------------

  useEffect(() => {
    getProductsList();
  }, [pageCount, searchProduct, catId]);

  useEffect(() => {
    sliderList();
  }, []);

  return (
    <>
      <CarouselSlider items={listSlider} />
      <section className="search-product">
        {getUser() && (
          <form autoComplete="off">
            <TextField
              variant="outlined"
              size="small"
              placeholder="جستجو براساس کد کالا / نام محصول"
              onChange={debouncedSearch}
              className="search-field"
            />
          </form>
        )}
      </section>
      <Categories
        items={productGroupCategory}
        selected={(type) => selectedCategoris(type)}
      />
      {subCategories.length > 0 && (
        <CategoriInline
          items={subCategories}
          selected={(id) => getSelectedInlineCategory(id)}
        />
      )}
      {getUser() && (
        <Product
          list={productItems?.products}
          totalPage={productItems?.totalProducts}
          countPage={pageCount}
          update={getUpdatePage}
        />
      )}
      {!getUser() && (
        <CategoryProduct
          list={productItems?.products}
          totalPage={productItems?.totalProducts}
          countPage={pageCount}
          update={getUpdatePage}
        />
      )}
    </>
  );
};

export default Home;
