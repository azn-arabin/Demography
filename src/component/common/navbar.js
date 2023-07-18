"use client";
import React, { useState } from "react";
import styles from "@/styles/common.module.css";
import Container from "@/component/common/container";
import Navs from "@/component/common/navs";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChartSimple,
  faXmark as faXMark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Navbar = () => {
  const [showNavs, setShowNavs] = useState(false);

  return (
    <div className={styles.navWrapper}>
      <Container>
        <div className={styles.navbar}>
          <div className={styles.navLeft}>
            <Link href={"/"} className={styles.brand}>
              <FontAwesomeIcon icon={faChartSimple} />
              Demography
            </Link>
            <Navs setShowNavs={setShowNavs} className={styles.navCollapse} />
          </div>
          <div>
            <button
              className={`button ${styles.navToggle}`}
              onClick={() => setShowNavs(!showNavs)}
            >
              <FontAwesomeIcon icon={showNavs ? faXMark : faBars} />
            </button>
          </div>
        </div>
      </Container>
      <Container>
        <motion.div
          animate={showNavs ? "open" : "closed"}
          variants={{
            open: { opacity: 1, x: 0 },
            closed: { opacity: 0, x: "-100%" },
          }}
        >
          <Navs
            setShowNavs={setShowNavs}
            className={showNavs ? styles.showNav : styles.hideNav}
          />
        </motion.div>
      </Container>
    </div>
  );
};

export default Navbar;
