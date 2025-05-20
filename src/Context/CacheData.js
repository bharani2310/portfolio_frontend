import { useEffect, useState } from "react";
import { useZip } from "../Context/ZipContext";          // adjust path/casing
import { isCacheValid } from "../components/utils/TimeStamp";
import { transformData } from "../components/Skills/support";


const CacheData = () => {
  const zipData = useZip();
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (!zipData) return;
    setSpinner(true)
    // Is the local cache still fresh?
    if (isCacheValid("Data")) {
      setSpinner(false)
      return;
    }

    (async () => {
      
      try {
        

        console.log("Spinner",spinner)

        // Timestamp
        localStorage.setItem("Data_timestamp", Date.now().toString());

        // Store pieces of the ZIP payload
        console.log(zipData)
        localStorage.setItem(
          "profile-pic",
          JSON.stringify(zipData?.images?.[0]?.image || "")
        );
        localStorage.setItem("projects", JSON.stringify(zipData?.projects || []));
        localStorage.setItem("tech", JSON.stringify(zipData?.tech || []));

        // Transform and sort skills
        const sortedSkills = (zipData?.skills || [])
          .map(transformData)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        localStorage.setItem("experience", JSON.stringify(sortedSkills));

        // // Hard refresh so the app can re-hydrate from localStorage
        // window.location.reload();
      } catch (err) {
        console.error("⚠️ Failed to cache data:", err);
      } finally {
        setSpinner(false);
      }
    })();
  }, [zipData]);

  useEffect(() => {
    console.log("🔄 Spinner state changed:", spinner);
  }, [spinner]);
  



  // Optional spinner overlay
  return  (
    spinner ? (<div className="loader-overlay">
    <span className="loader" />
    <h1>Loading…</h1>
  </div>): null
  ) ;
};

export default CacheData;
