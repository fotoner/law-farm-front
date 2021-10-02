import {useState, useEffect} from 'react'

const useScroll = () => {
  const [scrolled, setScrolled] = useState(window.scrollY > 10);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return [scrolled]
}

export default useScroll
