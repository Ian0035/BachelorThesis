"use client"; // This forces Next.js to treat this file as a client component

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; // Import styles
import { useRouter } from 'next/navigation';
import { useTransition } from "react";

export default function Index() {   
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
 
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 2000, // Delay between slide transitions (in milliseconds)
        slidesToShow: 3,
        slidesToScroll: 1
    };
    const cards = [
        {
          id: 1,
          title: 'Content Coverage',
          description: 'Ensuring comprehensive content coverage is crucial for mastering all key concepts and avoiding knowledge gaps. Without thorough coverage, students may struggle with advanced topics, leading to a weaker overall understanding.',
        },
        {
          id: 2,
          title: 'Practice Resources',
          description: 'Having ample practice resources is essential for reinforcing learning and building confidence in applying knowledge. Regular practice helps identify weak areas, improve problem-solving skills, and solidify concepts over time.',
        },
        {
          id: 3,
          title: 'Flexibility and Accessibility',
          description: 'Learning should fit into your schedule, making flexible and accessible resources vital for consistent progress. The ability to study at your own pace and access materials on-demand ensures a smoother and more efficient learning experience.',
        },
        {
          id: 4,
          title: 'Student Support',
          description: 'Access to reliable student support can make a significant difference in overcoming challenges and staying motivated. Whether through mentors, forums, or live Q&A sessions, having guidance can help clarify doubts and maintain engagement.',
        },
        {
          id: 5,
          title: 'Cost-effectiveness',
          description: 'Investing in education should be affordable, ensuring that quality learning remains accessible to all. A well-structured cost-effective approach allows students to gain valuable knowledge without financial strain, making learning more sustainable.',
        },
      ];

    useEffect(() => {
        router.prefetch('/tool');
      }, [router]);
      
      
    

  return (
      <>
      <div className="relative isolate w-full">
            {/* Top Background - Positioned Top-Right */}
            <div
                aria-hidden="true"
                className="absolute top-[5%] right-[5%] z-0 transform-gpu blur-3xl overflow-hidden sm:w-fit w-1/2"
            >
                <div
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                    className="relative h-[500px] aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-green-500 to-green-500 opacity-30 sm:w-[72.1875rem]"
                />
            </div>

            {/* Main Content */}
            <div className="relative isolate px-6 sm:pt-14 pt-4 lg:px-8">
                <div className="mx-auto max-w-2xl py-10 sm:py-32 lg:pt-16 lg:pb-28">
                    <div className="text-center relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="md:text-7xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 text-5xl"
                        >
                            Problem with <span className="text-green-500">choosing</span> the right{" "}
                            <span className="text-green-500">CFA</span> provider?
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
                            className="mt-8 text-lg font-medium text-gray-700 dark:text-gray-300 sm:text-xl"
                        >
                            Choosing the right <span className="text-green-500">provider</span> is
                            important. Do our <span className="text-green-500">test</span> and find
                            out which provider is the best for you.
                        </motion.p>
                    </div>

                    <div className="mt-10 flex text-center items-center justify-center sm:gap-x-6 gap-x-3">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
                        >
                            <Link
                                href="/tool"
                                onClick={(e) => {
                                    e.preventDefault();
                                    startTransition(() => {
                                    router.push('/tool');
                                    });
                                }}
                                className="rounded-md bg-green-500 px-5 py-3 sm:text-base text-sm font-semibold text-white dark:text-gray-200 shadow-xs hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >
                               {isPending ? "Loading..." : "Do the test"}
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 1.2 }}
                        >
                            <a
                                href="#information"
                                className="sm:text-base text-sm font-semibold rounded-full border px-5 py-3 text-gray-900 dark:text-gray-200 dark:border-gray-200"
                            >
                                Learn more <span aria-hidden="true">↓</span>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Background - Positioned Bottom-Left */}
            <div
                aria-hidden="true"
                className="absolute bottom-[5%] left-[5%] z-0 transform-gpu blur-3xl overflow-hidden sm:w-fit w-1/2"
            >
                <div
                    style={{
                        clipPath:
                        "polygon(13% 14%, 12% 43%, 15% 69%, 24% 82%, 41% 87%, 59% 84%, 65% 76%, 55% 67%, 45% 59%, 46% 41%, 46% 24%, 45% 19%, 32% 10%)",
                    }}
                    className="relative h-[500px] aspect-[1155/678] w-[32.125rem] rotate-x-180 -rotate-y-180 bg-gradient-to-tr from-gray-100 to-green-500 opacity-30"
                />
            </div>
        </div>



          <div className="overflow-hidden pt-24 pb-10 w-full" id='information'>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pt-4 lg:pr-8">
                    <div className="lg:max-w-lg">
                    <h2 className="text-base/7 font-semibold text-emerald-600">Succeed with the Right CFA Provider</h2>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-gray-200 sm:text-5xl">
                    Your Path to a CFA <span className="text-green-500">Certification</span>
                    </p>
                    <p className="mt-5 sm:text-lg/8 text-sm text-gray-600 dark:text-gray-300">
                    Choosing the right CFA course provider can make or break your success. A well-structured program ensures you stay on track, grasp key concepts, and pass on your first attempt.
                    </p>
                    <dl className="mt-7 max-w-xl space-y-5 text-base/7 text-gray-600 lg:max-w-none">
                        <div className="relative pl-9">
                            <dt className="inline font-semibold text-gray-900 dark:text-gray-200">
                            Comprehensive Study Material:&nbsp;
                            </dt>
                            <dd className="inline dark:text-gray-300">A top-tier provider offers in-depth study materials, mock exams, and real-world examples, helping you fully understand complex financial topics.</dd>
                        </div>
                        <div className="relative pl-9">
                            <dt className="inline font-semibold text-gray-900 dark:text-gray-200">
                            Expert Guidance & Support:&nbsp;
                            </dt>
                            <dd className="inline dark:text-gray-300">Having access to experienced instructors and a support network can make a huge difference in your learning journey, giving you clarity on tough concepts.</dd>
                        </div>
                        <div className="relative pl-9">
                            <dt className="inline font-semibold text-gray-900 dark:text-gray-200">
                            Efficient Learning Strategies:&nbsp; 
                            </dt>
                            <dd className="inline dark:text-gray-300">The best providers use adaptive learning, practice questions, and performance analytics to help you maximize efficiency and retain information effectively.</dd>
                        </div>
                    </dl>
                    </div>
                </div>
                {/* Light mode image */}
                    <img
                    alt="Product screenshot light"
                    src="/images/imagelight.jpg"
                    width={2432}
                    height={1442}
                    className="w-[48rem] sm:block max-w-none sm:w-[57rem] md:-ml-4 lg:-ml-0 dark:hidden"
                    />

                    {/* Dark mode image */}
                    <img
                    alt="Product screenshot dark"
                    src="/images/imagedark.jpg"
                    width={2432}
                    height={1442}
                    className="w-[48rem] max-w-none sm:w-[57rem] md:-ml-4 lg:-ml-0 hidden dark:sm:block"
                    />

                </div>
            </div>
        </div>

       <div className="lg:flex block justify-between items-center py-5 mb-3 w-full">
            <div className="lg:w-6/12 w-full">
                <div className='text-center mx-auto'>
                    <h1 className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl px-5">Find your <span className="text-green-500">Provider</span> based on the following <span className="text-green-500">Criteria:</span></h1>
                    
                </div>
            </div>

            <div className="lg:w-7/12 w-full lg:py-16 py-6 px-4 lg:border-t-2 lg:border-b-2 lg:border-l-2 border-green-500 bg-gray-50 dark:bg-zinc-800 rounded-s-2xl">
                <div className="w-11/12 mx-auto showcardswhenbig">
                    <Slider {...settings}>
                        {cards.map((card) => (
                            <div key={card.id} className="lg:p-4 p-2 bg-white dark:bg-zinc-700 mb-4 rounded-lg shadow-md">
                                <h3 className="font-semibold tracking-tight text-green-500 sm:text-3xl text-lg mb-1">{card.title}</h3>
                                <p className="text-gray-500 dark:text-gray-300 sm:text-base text-xs">{card.description}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="w-11/12 mx-auto hidecardswhentosmall">
                        {cards.map((card) => (
                            <div key={card.id} className="lg:p-4 p-2 bg-white dark:bg-zinc-700  mb-4 rounded-lg shadow-md">
                                <h3 className="font-semibold tracking-tight text-green-500 sm:text-3xl text-lg mb-1">{card.title}</h3>
                                <p className="text-gray-500 dark:text-gray-300 sm:text-base text-xs">{card.description}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>

    </>
    );
}