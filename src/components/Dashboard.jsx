import { Fragment, useState } from "react";
import CardsData from "./CardsData";
import AddUrl from "./AddUrl";

const Dashboard = () => {
  const [url, setUrl] = useState(null);

  const handleUrlSubmit = (submittedUrl) => {
    setUrl(submittedUrl);
  };

  return (
    <Fragment>
      {!url && <AddUrl onUrlSubmit={handleUrlSubmit} />}
      {url && <CardsData url={url} />}
    </Fragment>
  );
};

export default Dashboard;
