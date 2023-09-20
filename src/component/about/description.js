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
          Dr. Mamun - Ur - Rashid Khandker,
        </ExternalLink>{" "}
        for his valuable guidance and support throughout the project. His
        expertise and encouragement have been instrumental in the successful
        completion of this endeavor.
      </Section>
      <Section title={"Algorithm"}>
        The algorithm initiates its process by gathering essential data from
        reputable sources, which includes death rates and infant mortality rates
        covering the extensive period from 2011 to 2101. These rates, averaged
        every five years, are meticulously collected from{" "}
        <ExternalLink
          href={
            "https://www.macrotrends.net/countries/BGD/bangladesh/death-rate"
          }
        >
          MacroTrends
        </ExternalLink>
        . Additionally, the algorithm incorporates suicide rates spanning the
        period of 2011 to 2023 from the same source. Crucial insights are drawn
        from total population figures and population distribution across various
        age groups, such as 0-4, 5-9, sourced from{" "}
        <ExternalLink
          href={"https://en.wikipedia.org/wiki/Demographics_of_Bangladesh"}
        >
          Wikipedia
        </ExternalLink>
        . A significant foundation for geographic understanding is established
        through the district and division data of the{" "}
        <ExternalLink
          href={
            "https://www.bbs.gov.bd/site/page/47856ad0-7e1c-4aab-bd78-892733bc06eb/Population-and-Housing-Census"
          }
        >
          2011 Bangladesh census
        </ExternalLink>
        .<br /> <br /> Central to the algorithm's operation is the simulation of
        population dynamics across time. The initial step involves the division
        of the population of each district into specific age groups based on the
        percentage distribution of the total population within those groups. Key
        age segments, notably the 20-24 age group of each that represents
        potential new couples, are identified as pivotal contributors to future
        population growth. <br /> <br /> When a user specifies a target year
        within the range of 2012 to 2101 and indicates the desired number of
        children per couple, the algorithm embarks on a series of iterative
        steps. These iterations span from 2011 to the user-specified target
        year, allowing for a comprehensive view of population changes. For
        instance, if the user selects the year 2101 as the target and inputs a
        desired average of 2 children per couple, the algorithm iterates through
        every five-year interval. <br /> <br /> During each iteration, the
        algorithm calculates trends, estimates child populations by multiplying
        the population of the 20-24 age group (half of the group) by the
        user-provided number of children. Adjustments are made based on infant
        mortality rates, and the child populations are further refined.
        Moreover, the influence of death rates and migration rates on the
        overall population is factored in. To ensure a realistic model, the
        algorithm facilitates shifts of individuals between adjacent age groups
        as the years progress. For instance, individuals within the 15-19 age
        group transition to the 20-24 age group, while newly born children are
        included in the 0-4 age group. Suicide and migration rates are
        considered for the 15-19 age group. This meticulous process ensures that
        age distributions remain consistent and coherent throughout the
        iterative calculations. The algorithm's predictive power is rooted in
        its ability to continuously update population figures and age group
        distributions over the projected timeline.
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
