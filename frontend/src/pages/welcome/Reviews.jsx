import {
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import Card from "./Card";

function Reviews() {
  let reviews = [
    {
      id: 1,
      name: "Raghav Shrivastav",
      position: "Web Designer",
      rating: 5,
      text: "ConnectEdge revolutionized my job search! The AI matching is incredibly accurate. I landed my dream job at Google within 2 weeks of using the platform. The interview prep resources were especially helpful.",
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "Frontend Developer",
      rating: 4,
      text: "As a female developer, I was hesitant about job platforms, but ConnectEdge's inclusive approach impressed me. The skill-based matching connected me with companies that truly valued my expertise in React and Node.js.",
    },
    {
      id: 3,
      name: "Arjun Menon",
      position: "Frontend Developer",
      rating: 5,
      text: "The coding challenge feature is brilliant! It helped me showcase my skills beyond just my resume. I received 5 interview requests within days of completing their full-stack developer challenge.",
    },
    {
      id: 4,
      name: "Neha Gupta",
      position: "Frontend Developer",
      rating: 5,
      text: "ConnectEdge's salary transparency feature saved me so much time. No more going through lengthy interview processes only to find the compensation wasn't competitive. Found a perfect match with a 30% salary bump!",
    },
    {
      id: 5,
      name: "Karan Singh",
      position: "Frontend Developer",
      rating: 4,
      text: "The platform is great but could use more startup options. That said, their matching algorithm connected me with a promising Series B company that aligned perfectly with my skills in DevOps and cloud architecture.",
    },
    {
      id: 6,
      name: "Ananya Sharma",
      position: "Frontend Developer",
      rating: 5,
      text: "As a recent grad, I was struggling to get noticed. ConnectEdge's profile optimization tips and new talent program helped me stand out. Got three offers within a month! The mentorship feature was invaluable.",
    },
    {
      id: 4,
      name: "Neha Gupta",
      position: "Frontend Developer",
      rating: 5,
      text: "ConnectEdge's salary transparency feature saved me so much time. No more going through lengthy interview processes only to find the compensation wasn't competitive. Found a perfect match with a 30% salary bump!",
    },
    {
      id: 5,
      name: "Karan Singh",
      position: "Frontend Developer",
      rating: 4,
      text: "The platform is great but could use more startup options. That said, their matching algorithm connected me with a promising Series B company that aligned perfectly with my skills in DevOps and cloud architecture.",
    },
    {
      id: 6,
      name: "Ananya Sharma",
      position: "Frontend Developer",
      rating: 5,
      text: "As a recent grad, I was struggling to get noticed. ConnectEdge's profile optimization tips and new talent program helped me stand out. Got three offers within a month! The mentorship feature was invaluable.",
    },
  ];

  return (
    <div data-testid="review" className="px-4 py-8 max-w-[1400px] mx-auto relative">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="pb-12"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <Card {...review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Reviews;
