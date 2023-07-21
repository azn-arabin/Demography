import React from "react";
import styles from "@/styles/about.module.css";
import Section from "@/component/about/section";
import Introductions from "@/component/about/indrotuctions";
import ExternalLink from "@/component/common/external-link";

const Description = () => {
  return (
    <div className={styles.description}>
      <Section title={"Abstract"}>
        This Demographic Web Application is an undergraduate level project
        developed as part of the academic curriculum in the Department of{" "}
        <ExternalLink href={"https://www.ru.ac.bd/eee/"}>
          Electrical and Electronic Engineering
        </ExternalLink>{" "}
        at{" "}
        <ExternalLink href={"https://www.ru.ac.bd/"}>
          University of Rajshahi.
        </ExternalLink>
        The project aims to provide a user-friendly platform for projecting the
        total population of Bangladesh based on user inputs. The application
        utilizes Next.js, React, and various libraries to offer interactive
        visualization and population trend analysis.
      </Section>
      <Section title={"Project Details"}>
        This Demographic Web Application allows users to input parameters such
        as the number of children per couple and the target year for population
        projections. Using this information, the application employs demographic
        data and algorithms to estimate the future population of Bangladesh. The
        projections are displayed through interactive graphs and charts,
        allowing users to explore population trends from 2011 to the selected
        year.
      </Section>
      <Section title={"Importance"}>
        This Demographic Web Application serves as a valuable tool for
        policymakers, researchers, and students interested in understanding
        population dynamics in Bangladesh. It provides valuable insights into
        the potential growth of the country's population, which can aid in
        making informed decisions regarding resource allocation, infrastructure
        planning, and social policies.
      </Section>
      <Section title={"Acknowledgment"}>
        We would like to express our sincere gratitude to our supervisor,{" "}
        <ExternalLink
          href={
            "http://rurfid.ru.ac.bd/ru_profile/public/teacher/25400487/profile"
          }
        >
          Prof. Dr. Mamun-ur-Rashid Khandker,
        </ExternalLink>{" "}
        for his valuable guidance and support throughout the project. His
        expertise and encouragement have been instrumental in the successful
        completion of this endeavor.
      </Section>
      <Section title={"Disclaimer"}>
        Please note that the population projections provided by the Demography
        Web Application are based on available data. The accuracy of these
        projections may vary due to unforeseen factors or changes in demographic
        patterns. Users are advised to interpret the results with caution and
        seek professional advice when making significant decisions based on the
        application's outputs.
      </Section>
      <Section title={"Future Scope"}>
        The project lays the foundation for potential enhancements and research
        in the field of population projections. Future developments may include
        incorporating additional demographic parameters, exploring machine
        learning techniques, and expanding the application's scope to cover
        other regions or countries.
      </Section>
      <Introductions />
    </div>
  );
};

export default Description;
