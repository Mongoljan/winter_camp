'use client'
import { useState } from 'react';

const categories = ['Сузанна', 'Паул', 'Елиша'];
const questions = [
  [
    { question: "Нар, сар, од гурвын дунд юу байдаг вэ? ", answer: "таслал" },
    { question: "Ямар хүн авах биш өгөх дуртай байдаг вэ? ", answer: "боксчин" },
    { question: "Хүн хоногт хичнээн хэмжээний агаар амьсгалдаг вэ?", answer: "12 кг" },
    { question: "Өдрөөс өдөрт манай дэлхий улам бүр хүнд болж байгаа. Харин үүний 60 тонныг нэгэн хачирхалтай зүйл бүрдүүлдэг аж. Энэ нь юу вэ? ", answer: "Сансрын тоос" },
    { question: "Даниел юугаараа онцлог вэ?", answer: "Мэргэн ухаантай, эш үзүүлэгч," },
    { question: "Сузаннагийн нэрний утга?", answer: "Сараана буюу Цэвэр ариун, ихэмсэг, уужим сэтгэлтэй " },
    { question: "Даниелын нэрний утга юу вэ?", answer: "Бурхан бол миний Шүүгч" },
    { question: "Даниел хэний хүү вэ? ", answer: "Давидын 2 дах хүү болох Хилеабын Хүү" },
    { question: "Сузаннаг аль номонд бичсэн байдаг вэ?", answer: "Лук" },
    { question: "Сузаннагийн библи дээрх түүх юу вэ?", answer: "Сайн мэдээнд эд хөрөнгөөрөө үйлчилсэн" },









  ],
  [
    { question: "Баагий багш энэ жил хэдэн нас хүрэх вэ?", answer: "28" },
   
    { question: "Цуглаан хэдэн онд байгуулагдсан бэ?", answer: "1997" },
    { question: "Саул хэнийг чулуугаар цохисон бэ?", answer: "Стефан" },
    { question: "Паул хэдэн хоног сохор байсан бэ?", answer: "3 хоног" },
    { question: "Паулын нүдийг хэн нээсэн бэ?", answer: "Ананиа" },
    { question: "Паулын өмнөх нэр ?", answer: " Саул" },
    { question: "Паул хэдэн аянд явсан бэ?", answer: "3" },
    { question: "Паул хэдэн ном бичсэн бэ?", answer: "13" },
    { question: "Тарсус хот одоогийн аль хотод байдаг вэ?", answer: "Турк" },
    { question: "Паул Есүс Эзэнээс хэдэн жилийн дараа төрсөн бэ?", answer: "6 жил" }
  ],
  [
    { question: "Who was the first president of the United States?", answer: "George Washington" },
    { question: "In what year did the Titanic sink?", answer: "1912" },
    { question: "Who wrote the 'Declaration of Independence'?", answer: "Thomas Jefferson" },
    { question: "What is the capital of Japan?", answer: "Tokyo" },
    { question: "What year did World War II end?", answer: "1945" },
    { question: "Who discovered America in 1492?", answer: "Christopher Columbus" },
    { question: "Who was known as the 'Iron Lady'?", answer: "Margaret Thatcher" },
    { question: "Which city is known as the birthplace of democracy?", answer: "Athens" },
    { question: "Who was the first man to walk on the moon?", answer: "Neil Armstrong" },
    { question: "What is the Great Wall of China?", answer: "A series of fortifications" }
  ]
];

const Home = () => {
  const [usedQuestions, setUsedQuestions] = useState(
    Array(3).fill(null).map(() => Array(10).fill(false))
  );
  const [selectedCard, setSelectedCard] = useState<{ category: number, index: number } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCardClick = (categoryIndex: number, questionIndex: number) => {
    if (usedQuestions[categoryIndex][questionIndex]) return; // Prevent clicking used cards
    setSelectedCard({ category: categoryIndex, index: questionIndex });
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    if (!selectedCard) return;

    setUsedQuestions(prev => {
      const updated = [...prev];
      updated[selectedCard.category][selectedCard.index] = true;
      return updated;
    });
    setShowAnswer(true);
  };

  const handleCloseCard = () => setSelectedCard(null);

  return (
    <div className="grid grid-cols-3 gap-24 p-8   min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      {/* Categories and questions */}
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-24 space-x-[25%] px-[100px]  text-black text-[40px] ">
          <h2 className="translate-x-[12%] text-center text-[80px] font-black text-black">{category}</h2>
          {questions[categoryIndex].map((q, questionIndex) => (
            <div
              key={questionIndex}
              className={`flex items-center justify-center text-white text-[60px] p-16 min-h-[7%] rounded-xl cursor-pointer transition-all duration-300 ${
                usedQuestions[categoryIndex][questionIndex] ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-900'
              }`}
              onClick={() => handleCardClick(categoryIndex, questionIndex)}
            >
              {`${(questionIndex + 1) * 100} Points`}
            </div>
          ))}
        </div>
      ))}

      {/* Popup for selected question */}
      {selectedCard && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-8 pt-[10%] rounded-lg text-center min-w-[80%] min-h-[80%] max-w-lg relative">
            <h3 className="text-[100px] font-bold mb-4 text-black ">
              {questions[selectedCard.category][selectedCard.index].question}
            </h3>
            {!showAnswer ? (
              <button
                onClick={handleShowAnswer}
                className="bg-blue-500 text-white px-20 mt-[5%] py-10 rounded-3xl text-[60px]"
              >
                Хaриултыг харах
              </button>
            ) : (
              <p className="text-xl text-gray-600 pt-[5%] text-[100px]">
          Хариулт:      {questions[selectedCard.category][selectedCard.index].answer}
              </p>
            )}
            <button
              onClick={handleCloseCard}
              className="absolute top-20 right-20 bg-red-500 text-white px-10 py-2 text-[60px] rounded-3xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
