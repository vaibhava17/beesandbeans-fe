import React from "react";
import { inject, observer } from "mobx-react";
import Header from "components/Header/Header";
import Overview from "components/Overview/Products/Overview";
import FourCards from "components/CardSets/FourCards";
import ContactButtons from "components/Contact/ContactButtons/ContactSmall";
import ParallaxCover from "components/SupportItems/ParallaxCover/ParallaxCover";
import Stats from "components/Overview/Stats/Stats";
import cover from "assets/images/chocolates.jpg";

const Home = () => {
  return (
    <>
      <Header
        img={cover}
        content={
          <>
            It's stocking up time! <br />
            Find just what you need that mistify your senses and to create
            moments of magic your family will love.
          </>
        }
      />
      <Overview />
      <FourCards label="Hot picks" sortField="likes" />
      <FourCards label="New Products" sortField="createdAt" />
      <ContactButtons />
      <ParallaxCover children={<Stats />} img={cover} />
    </>
  );
};

export default inject((stores) => ({
  userStore: stores.store.userStore,
}))(observer(Home));
