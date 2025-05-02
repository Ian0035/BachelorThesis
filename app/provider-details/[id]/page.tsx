"use client";

import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; // ✅ Correct Supabase Client
import { Reviews } from "@mui/icons-material";


interface Provider {
  id: number;
  name: string;
  description: string;
  link: string;
  img:string;
  similarityScore: number;
  certified: string;
  scores: { [key: string]: number }; // Example: { "Student Support": 78, "Course Material": 85 }
}


interface StoredRatings {
  [key: string]: number; // Example: { "Student Support": 65, "Course Material": 90 }
}

interface review {
  created_at: string | number | Date;
  rating: number;
  review: string;
  user: {
    email: string;
  };
}

export default function ProviderDetails() {
  const params = useParams();
  const id = params?.id as string;
  const [provider, setProvider] = useState<Provider | null>(null);
  const [storedRatings, setStoredRatings] = useState<StoredRatings | null>(null);
  const [reviews, setReviews] = useState<review[] | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [userReview, setUserReview] = useState("");
  const supabase = createClientComponentClient();
  const [userRating, setUserRating] = useState<number>(0);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"submit" | "eddit" | null>(null);

  const showAlert = (message: string, type: "submit" | "eddit") => {
    setAlertMessage(message);
    setAlertType(type);

    setTimeout(() => {
      setAlertMessage(null); // Hide alert after 3 seconds
    }, 3000);
  };

  
  

  useEffect(() => {
    if (!id) return;
  
    // Fetch providers from localStorage
    const storedProviders = JSON.parse(localStorage.getItem("rankedProviders") || "[]");
  
    // Find provider by ID
    const selectedProvider = storedProviders.find((p: Provider) => p.id.toString() === id);
  
    if (selectedProvider) {
      // Transform provider data to include a "scores" object
      const formattedProvider = {
        ...selectedProvider,
        scores: {
          "Content Coverage": selectedProvider.contentQuality,
          "Practice Resources": selectedProvider.practiseMaterial,
          "Flexibility and Accessibility": selectedProvider.flexibilityAccessibility,
          "Student Support": selectedProvider.studentPortal,
          "Cost-effectiveness": selectedProvider.costEffectiveness,
        },
      };
      setProvider(formattedProvider);
    }
  
    // Retrieve storedRatings from localStorage
    const ratings = JSON.parse(localStorage.getItem("storedRatings") || "{}");
      setStoredRatings(ratings);
    }, [id]);


    useEffect(() => {
      const updateAuthState = () => {
        setIsLoggedIn(localStorage.getItem("isAuthenticated") === "true");
      };

      const storedAuth = localStorage.getItem("isAuthenticated");
      if (!storedAuth) {
        setIsLoggedIn(false);  
      }
      else {
        setIsLoggedIn(true);

      }
    
      window.addEventListener("authChanged", updateAuthState);
    
      return () => {
        window.removeEventListener("authChanged", updateAuthState);
      };
    }, []);

    useEffect(() => {
      fetchReviews(); // Fetch reviews when the provider changes
      setUserRating(0); // Reset user rating when the provider changes
      setUserReview(""); // Reset user review when the provider changes
    }, [provider?.id]);

    useEffect(() => {
      const fetchUserReviews = async () => {
        if (!provider) return;
    
        const { data: review, error } = await supabase
            .from("reviews")
            .select("review, rating, created_at, Users(email)") // Ensure the table name matches your database schema
            .eq("id_provider", provider.id);
          
    
        if (error) {
          console.error("Error fetching reviews:", error.message);
        } else {
            setReviews(review.map((r: any) => ({
                    review: r.review,
                    rating: r.rating,
                    created_at: r.created_at,
                    user: r.Users
                  })));       
             }
      };
    
      fetchUserReviews();
    }, [provider?.id]);

    useEffect(() => {
      const fetchUserReview = async () => {
        const userId = localStorage.getItem("user_id");
        if (!userId) return;
    
        if (!provider) return;

        const { data: existingReview } = await supabase
          .from("reviews")
          .select("review")
          .eq("id_provider", provider.id)
          .eq("id_user", userId)
          .single();
    
        if (existingReview) {
          setUserReview(existingReview.review);
          setIsReview(true);
        }
      };
    
      fetchUserReview();
    }, [provider?.id]);

    const fetchReviews = async () => {
      if (!provider) return;
  
      const { data: reviewsData, error } = await supabase
        .from("reviews")
        .select("review, rating, created_at, Users(email)")
        .eq("id_provider", provider.id);
  
      if (error) {
        console.error("Error fetching reviews:", error.message);
      } else {
        setReviews(reviewsData.map((r: any) => ({
          review: r.review,
          rating: r.rating,
          created_at: r.created_at,
          user: r.Users,
        })));
      }
    };

    const handleReviewSubmit = async () => {
        if (!userReview.trim() || !provider || userRating < 1) return; // Prevent empty reviews and ensure rating is set
        
        const userId = localStorage.getItem("user_id");
        if (!userId) return;
      
        const { error } = await supabase.from("reviews").insert([
          { id_provider: provider.id, id_user: userId, review: userReview, rating: userRating }
        ]);
      
        if (error) {
          console.error("Error submitting review:", error.message);
          alert("Error submitting review. Please try again.");
        } else {
          setIsReview(true);
          window.dispatchEvent(new Event("authChanged"));
          showAlert("Review submitted successfully! Thank you for sharing your experience.", "submit");
          fetchReviews(); // Refetch the list of reviews after editing a review
        }
    };

    const handleReviewEdit = async () => {
      if (!userReview.trim()) return; // Prevent empty reviews
    
      // Update existing review logic
      if (!provider) return; // Ensure provider is not null
      const { error } = await supabase
        .from("reviews")
        .update({ review: userReview, rating: userRating, created_at: new Date() })
        .eq("id_provider", provider.id)
        .eq("id_user", localStorage.getItem("user_id"));
    
      if (error) {
        console.error("Error updating review:", error.message);
      } else {
        console.log("Review updated successfully!");
      }

      showAlert("Review updated successfully! Thank you for your feedback.", "eddit");
      // Dynamically update the review list with the edited review
      fetchReviews(); // Refetch the list of reviews after editing a review
    };
    
    

  if (!provider) {
    return <p className="text-center text-gray-600">Provider not found.</p>;
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-zinc-800">
    <div className="min-h-screen flex flex-col items-center p-10 md:w-10/12 w-full mx-auto">
      <div className="w-full flex md:justify-between justify-center">

        <div className="pl-7 w-60 h-60 dark:bg-gray-200 dark:border-gray-500 pr-4 hidden md:flex border-r-2 border-b-2 rounded-lg items-center justify-center">
          <img className="align-middle" src={`/images/${provider.img}`} alt={provider.name} />
        </div>
        {/* Provider Details Section */}
        <div className="md:w-2/3 w-full md:ml-6 ml-0 text-center">
            <div className="md:w-4/5 w-full flex items-center justify-between mx-auto mb-5 sm:text-3xl text-2xl font-bold">
              <div className="flex items-center gap-2">
              <h1 className="text-black dark:text-gray-200">{provider.name}</h1>
              {provider.certified === "Certified" && (
                        <img
                          src="/images/certified.png"
                          alt="certified logo"
                          className="w-12 h-12 object-contain"
                        />
                      )}
              </div>
              <p className="inline-flex items-center">
               {(provider.similarityScore / 100).toFixed(1)}/5
                <Star className="sm:w-7 sm:h-7 w-6 h-6 fill-yellow-400 text-yellow-500 ml-1" />
              </p>
          </div>
          <div className="md:w-4/5 w-full mx-auto">
            <p className="text-gray-700 dark:text-gray-300">{provider.description}</p>
          </div>
        </div>
      </div>

      <div className="w-full md:flex flex-none justify-between mt-10">
        {/* Display Sliders for each category */}
        <div className="md:w-2/5 w-full">
          {Object.entries(provider.scores).map(([category, actualScore]) => {

            const userScore = storedRatings?.[category] || 0;

            return (
              <div key={category} className="mb-6">
                <label className="font-semibold block">{category}</label>

                {/* SLIDER CONTAINER */}
                <div className="relative w-full">
                  {/* black 100% (filled bar) */}
                  <div
                    className="absolute top-1/2 left-0 h-2 border border-zinc-500 bg-zinc-700 dark:bg-slate-100 rounded transition-all"
                    style={{ width: `100%`, transform: "translateY(-50%)" }}
                  ></div>
                  {/* Actual Score Slider (filled bar) */}
                  <div
                    className="absolute top-1/2 left-0 h-2 border border-zinc-500 bg-green-500 dark:bg-green-800 rounded transition-all"
                    style={{ width: `${userScore}%`, transform: "translateY(-50%)" }}
                  ></div>

                  {/* Actual score Indicator (small green ball) */}
                  <div
                    className="absolute top-1/2 h-4 w-4 bg-green-500 rounded-full dark:bg-green-800"
                    style={{ left: `${userScore}%`, transform: "translateX(-50%) translateY(-50%)" }}
                  ></div>

                  {/* User Score Indicator (small vertical line) */}
                  <div
                    className="absolute top-1/2 h-5 w-1 border border-red-600 bg-red-500 dark:bg-red-400 rounded"
                    style={{ left: `${actualScore}%`, transform: "translateX(-50%) translateY(-50%)" }}
                  ></div>

                  {/* Invisible Input Slider for Alignment */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={actualScore}
                    disabled
                    className="w-full mt-2 opacity-0 cursor-default"
                  />
                </div>

                {/* Display Values */}
                <div className="flex justify-between text-sm text-gray-600 dark:text-white mt-2">
                  <span>Provider: {actualScore}</span>
                  <span>Your Score: {userScore}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="md:w-3/5 w-full p-4">
          <div className="md:w-4/5 w-full mx-auto md:mr-5 mr-0">
          <h2 className="text-xl font-semibold mt-2 text-black dark:text-gray-200">Leave a review!</h2>
          <p className="text-black dark:text-gray-300">Have you had any experience with this provider?</p>
          {isLoggedIn ? (
              isReview ? (
                <>
                  <textarea
                    className="w-full h-44 mt-2 p-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-50 text-black dark:text-gray-300"
                    placeholder="Write your review here..."
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                  ></textarea>
                  <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 cursor-pointer ${i < userRating ? "fill-yellow-400" : "text-gray-300"}`}
                      onClick={() => setUserRating(i + 1)} // Sets rating when clicked
                    />
                  ))}
                </div>
                  <button
                    className="mt-2 px-4 py-2 font-semibold text-black dark:text-gray-300 bg-green-500 rounded-lg hover:bg-green-600"
                    onClick={handleReviewEdit} // This will handle the review editing
                  >
                    Edit Review
                  </button>
                </>
              ) : (
                <>
                  <textarea
                    className="w-full h-44 mt-2 p-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-50 text-black dark:text-gray-300"
                    placeholder="Write your review here..."
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                  ></textarea>
                  <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 cursor-pointer ${i < userRating ? "fill-yellow-400" : "text-gray-300"}`}
                      onClick={() => setUserRating(i + 1)} // Sets rating when clicked
                    />
                  ))}
                </div>
                  <button
                    className="mt-2 px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={handleReviewSubmit} // This will handle the review submission
                  >
                    Submit Review
                  </button>
                </>
              )
            ) : (
              <>
                <textarea
                  className="w-full h-44 mt-2 p-2 border-2 text-red-500 bg-white dark:bg-gray-50 border-red-300 rounded-lg"
                  value="You must be logged in to leave a review."
                  disabled
                ></textarea>
                <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6  text-gray-300"
                  />
                ))}
              </div>
                <button
                  className="mt-2 px-4 py-2 font-semibold text-white bg-red-500 rounded-lg"
                  disabled
                >
                  Submit Review
                </button>
              </>
            )}
            {alertMessage && (
              <div
                className={`w-full p-4 mt-4 text-center rounded-lg 
                ${alertType === "submit" ? "bg-blue-500" : 
                alertType === "eddit" ? "bg-green-500" : "bg-red-500"} 
                text-white`}
              >
                {alertMessage}
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="md:w-4/5 w-full mx-auto mt-10">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {reviews?.length ? (
          reviews.map((r, index) => (
            <div key={index} className="py-4 border-b dark:border-zinc-200">
              <div className="flex justify-between pb-2 md:pb-0">
                  {/* Left section: email + stars */}
                  <div className="flex flex-col md:flex-row md:items-center md:gap-2 gap-0.5">
                    <p className="font-medium truncate max-w-[150px] sm:max-w-full">{r.user.email}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < r.rating ? "fill-yellow-400 text-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right section: Date */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 md:mt-0">
                    {new Date(r.created_at).toLocaleDateString("en-GB")}
                  </p>
                </div>

              <p>{r.review}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
        )}
      </div>

      <a
        href={provider.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Visit Provider Website
      </a>
    </div>
    </div>
  );
}

