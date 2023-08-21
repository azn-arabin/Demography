import React from "react";
import styles from "@/styles/about.module.css";
import Introduction from "@/component/about/introduction";
import ExternalLink from "@/component/common/external-link";

const Introductions = () => {
  return (
    <div className={styles.introductions}>
      <Introduction title={"Supervisor"}>
        <ExternalLink
          href={
            "http://rurfid.ru.ac.bd/ru_profile/public/teacher/25400487/profile"
          }
        >
          ......,
        </ExternalLink>
      </Introduction>
      <Introduction title={"Student"}>
        <ExternalLink href={"https://arabin.vercel.app"}>
          Md. Asaduzzaman (Arabin),
        </ExternalLink>
      </Introduction>
    </div>
  );
};

export default Introductions;
