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
      <Section title={"Acknowledgment"}>
        We would like to express our sincere gratitude to our supervisor,{" "}
        <ExternalLink
          href={
            "http://rurfid.ru.ac.bd/ru_profile/public/teacher/25400487/profile"
          }
        >
          .......,
        </ExternalLink>{" "}
        for his valuable guidance and support throughout the project. His
        expertise and encouragement have been instrumental in the successful
        completion of this endeavor.
      </Section>
      <Section title={"Algorithm"}>
        The algorithm starts by gathering essential data from reputable sources.
        Death rates and infant mortality rates spanning 2011 to 2101, averaged
        every five years, are collected from{" "}
        <ExternalLink
          href={
            "https://www.macrotrends.net/countries/BGD/bangladesh/death-rate"
          }
        >
          MacroTrends
        </ExternalLink>
        . The algorithm also integrates suicide rates from period of 2011-2023
        from same source. Total population figures and population distribution
        by age groups (e.g., 0-4, 5-9) are sourced from trusted platforms,
        including{" "}
        <ExternalLink
          href={"https://en.wikipedia.org/wiki/Demographics_of_Bangladesh"}
        >
          Wikipedia
        </ExternalLink>
        . District and division data of 2011{" "}
        <ExternalLink
          href={
            "https://www.bbs.gov.bd/site/page/47856ad0-7e1c-4aab-bd78-892733bc06eb/Population-and-Housing-Census"
          }
        >
          Bangladesh census
        </ExternalLink>{" "}
        provide a crucial foundation for geographic insights. The core of the
        algorithm revolves around simulating population dynamics over time. Key
        age groups, such as 20-24, representing new couples, are identified as
        vital segments for projecting future population growth. When a user
        specifies a target year (between 2012 and 2101) and the desired number
        of children per couple, the algorithm embarks on a series of iterative
        steps. Iteration and Calculation For each iteration, the algorithm
        calculates trends over a five-year period. For instance, if the user
        selects 2101 as the target year and inputs 2 children per couple, the
        algorithm iterates from 2011 to 2101. In the initial five years
        (2011-2015), the algorithm estimates the child population by multiplying
        the couple population (half of age group: 20-24) by the user-provided
        child. Infant mortality rates are considered, and child populations are
        adjusted accordingly. Similarly, death rates are factored in, affecting
        the overall population. To ensure accurate modeling, the algorithm
        facilitates age group shifts. People within specific age ranges are
        moved to adjacent groups as years progress. For instance, individuals in
        the 15-19 age group transition to the 20-24 age group, and children born
        during the iteration enter the 0-4 age group. This meticulous process
        maintains the continuity of age distributions. Predictive Projections
        The iterative process is repeated for each subsequent five-year
        interval, continuously updating population figures and age group
        distributions. The algorithm's rigorous calculations provide a
        comprehensive perspective on how factors like birth rates, death rates,
        infant mortality, and age distributions interact over time. The
        prediction for division and districts works at the same way.
      </Section>
      <Section title={"Future Scope"}>
        The project forms the basis for prospective advancements and exploration
        in population projections. While the algorithm currently shifts age
        group populations, it doesn't incorporate age-specific death rates due
        to the unavailability of data. Future improvements may involve
        integrating age-specific death rates, provided data is attainable. Also
        we assume that individuals aged 20-24 constitute new couples, although
        data accuracy may vary. As we lack specific information on newly married
        couples, this assumption is made. Future improvements could encompass
        the inclusion of accurate data on new couples, provided such data
        becomes obtainable. Additionally, the application could delve into the
        realm of machine learning, and expanding the application's scope to
        cover other regions or countries.
      </Section>
      <Introductions />
    </div>
  );
};

export default Description;
