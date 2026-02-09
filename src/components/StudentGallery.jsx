// import React from "react";
// import post1 from "../assets/img/post1.jpg";
// import post2 from "../assets/img/post2.jpg";
// import post3 from "../assets/img/post3.jpg";
// import post4 from "../assets/img/post4.jpg";

// const ImageSlide = () => (
//   <div id="image-slide">
//     <img src={post1} alt="post 1" />
//     <img src={post2} alt="post 2" />
//     <img src={post3} alt="post 3" />
//     <img src={post4} alt="post 4" />
//   </div>
// );

// const GalleryBlock = ({ title }) => (
//   <div className="gallery-block">
//     <h2>{title}</h2>
//     <ImageSlide />
//   </div>
// );

// const StudentGallery = () => {
//   return (
//     <div id="gallery-page">
//       <h1>Diploma</h1>
//       <div id="diploma-gallery">
//         <GalleryBlock title="Sports day - 2024" />
//       </div>

//       <h1>Degree</h1>
//       <div id="degree-gallery">
//         <GalleryBlock title="Sports day - 2024" />
//       </div>
//     </div>
//   );
// };

// export default StudentGallery;


import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const SERVER = "http://localhost:5000";

/* ================= IMAGE SLIDE ================= */
const ImageSlide = ({ images }) => (
  <div id="image-slide">
    {images.map((img, i) => (
      <img key={i} src={`${SERVER}${img}`} alt="gallery" />
    ))}
  </div>
);

/* ================= BLOCK ================= */
const GalleryBlock = ({ title, images }) => (
  <div className="gallery-block">
    <h2>{title}</h2>
    <ImageSlide images={images} />
  </div>
);

/* ================= MAIN ================= */
const StudentGallery = () => {
  const [degreeSections, setDegreeSections] = useState([]);
  const [polySections, setPolySections] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    /* degree doc */
    const degreeSnap = await getDoc(doc(db, "gallery", "degree"));

    if (degreeSnap.exists()) {
      setDegreeSections(degreeSnap.data().sections || []);
    }

    /* polytechnic doc */
    const polySnap = await getDoc(doc(db, "gallery", "polytechnic"));

    if (polySnap.exists()) {
      setPolySections(polySnap.data().sections || []);
    }
  };

  return (
    <div id="gallery-page">
      {/* ================= DIPLOMA ================= */}
      <h1>Diploma</h1>
      <div id="diploma-gallery">
        {polySections.length === 0 ? (
          <p>No images</p>
        ) : (
          polySections.map((sec, i) => (
            <GalleryBlock
              key={i}
              title={sec.section}
              images={sec.img_list}
            />
          ))
        )}
      </div>

      {/* ================= DEGREE ================= */}
      <h1>Degree</h1>
      <div id="degree-gallery">
        {degreeSections.length === 0 ? (
          <p>No images</p>
        ) : (
          degreeSections.map((sec, i) => (
            <GalleryBlock
              key={i}
              title={sec.section}
              images={sec.img_list}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StudentGallery;
