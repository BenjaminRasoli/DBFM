import React from "react";
import "./About.css";

function About() {
  return (
    <>
      <div className="aboutContainer">
        <div className="aboutTextContainer">
          <h1>Let's talk about DBFM</h1>
          <div className="overallText">
            DBFM (The Movie Database) stands as a collaborative effort in
            curating a comprehensive repository of movies and TV shows. Since
            2008, our vibrant community has diligently contributed to building
            this valuable database. What sets DBFM apart is its robust
            international perspective and unparalleled breadth of data, a source
            of immense pride for us. To put it simply, we are driven by a
            passion for community collaboration, and it's this unique aspect
            that defines us.
          </div>
          <h2 className="advantage">The DBFM advantage</h2>
          <div className="aboutText">
            <div className="aboutNumber">
              <h2>1</h2>
            </div>
            <p>
              DBFM (The Movie Database) stands as a collective venture in
              curating a comprehensive movie and TV database. Since 2008, our
              extraordinary community has contributed every piece of data,
              forming a rich tapestry of information. DBFM takes pride in its
              robust international focus and extensive data coverage,
              distinguishing it significantly. In essence, we are not just a
              database; we are a thriving community, and this is what sets us
              apart.
            </p>
          </div>

          <div className="aboutText">
            <div className="aboutNumber">
              <h2>2</h2>
            </div>
            <p>
              In addition to providing comprehensive metadata for movies, TV
              shows, and individuals, we boast one of the finest collections of
              high-resolution posters and fan art. Remarkably, we add over 1,000
              images each day on average.
            </p>
          </div>
          <div className="aboutText">
            <div className="aboutNumber">
              <h2>3</h2>
            </div>
            <p>
              We're truly international. Although we officially support 39
              languages, our database also encompasses extensive regional data.
              DBFM is accessed every single day in over 180 countries,
              showcasing its global reach and impact.
            </p>
          </div>
          <div className="aboutText">
            <div className="aboutNumber">
              <h2>4</h2>
            </div>
            <p>
              Our community is unparalleled. With our dedicated staff and
              community moderators, assistance is always at your fingertips. We
              are deeply passionate about ensuring that your experience on DBFM
              is nothing short of amazing.
            </p>
          </div>
          <div className="aboutText">
            <div className="aboutNumber">
              <h2>5</h2>
            </div>
            <p>
              A reliable platform. Each day, millions of users trust our service
              as we handle over 3 billion requests. Over the years, we have
              consistently demonstrated that our platform is trustworthy and
              dependable.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
