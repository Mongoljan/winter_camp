'use client';
import { useState } from 'react';

const categories = ['Сузанна', 'Паул', 'Елиа'];
const questions = [
  [
    { question: "Нар, сар, од гурвын дунд юу байдаг вэ?", answer: "таслал" },
    { question: "Ямар хүн авах биш өгөх дуртай байдаг вэ?", answer: "боксчин" },
    { question: "Хүн хоногт хичнээн хэмжээний агаар амьсгалдаг вэ?", answer: "12 кг" },
    { question: "Өдрөөс өдөрт манай дэлхий улам бүр хүнд болж байгаа. Харин үүний 60 тонныг нэгэн хачирхалтай зүйл бүрдүүлдэг аж. Энэ нь юу вэ?", answer: "Сансрын тоос" },
    { question: "Даниел юугаараа онцлог вэ?", answer: "Мэргэн ухаантай, эш үзүүлэгч," },
    { question: "Сузаннагийн нэрний утга?", answer: "Сараана буюу Цэвэр ариун, ихэмсэг, уужим сэтгэлтэй" },
    { question: "Даниелын нэрний утга юу вэ?", answer: "Бурхан бол миний Шүүгч" },
    { question: "Даниел хэний хүү вэ?", answer: "Давидын 2 дах хүү болох Хилеабын Хүү" },
    { question: "Сузаннаг аль номонд бичсэн байдаг вэ?", answer: "Лук" },
    { question: "Сузаннагийн библи дээрх түүх юу вэ?", answer: "Сайн мэдээнд эд хөрөнгөөрөө үйлчилсэн" }
  ],
  [
    { question: "Баагий багш энэ жил хэдэн нас хүрэх вэ?", answer: "28" },
    { question: "Цуглаан хэдэн онд байгуулагдсан бэ?", answer: "1997" },
    { question: "Саул хэнийг чулуугаар цохисон бэ?", answer: "Стефан" },
    { question: "Паул хэдэн хоног сохор байсан бэ?", answer: "3 хоног" },
    { question: "Паулын нүдийг хэн нээсэн бэ?", answer: "Ананиа" },
    { question: "Паулын өмнөх нэр?", answer: "Саул" },
    { question: "Паул хэдэн аянд явсан бэ?", answer: "3" },
    { question: "Паул хэдэн ном бичсэн бэ?", answer: "13" },
    { question: "Тарсус хот одоогийн аль хотод байдаг вэ?", answer: "Турк" },
    { question: "Паул Есүс Эзэнээс хэдэн жилийн дараа төрсөн бэ?", answer: "6 жил" }
  ],
  [
    { question: "Баал гэж юу вэ?", answer: "Хиймэл шүтээн" },
    { question: "Анаашны хэл ямар өнгөтэй вэ? ", answer: "Цэнхэр эсвэл Хар" },
    { question: "Шар цэнхэр өнгийг хооронд нь холивол ямар өнгө үүсэх вэ?", answer: "Ногоон" },
    { question: "Елиа хэд насалсан бэ? ", answer: "Үхэлгүй тэнгэрт өргөгдсөн" },
    { question: "Моогий багш энэ жил хэдэн нас хүрэх вэ? ", answer: "23" },
    { question: "Ахаб хаан ямар улсын хаан байсан бэ?", answer: "Израил" },
    { question: "Яагаад Израилд бороо орохоо больсон бэ?", answer: "Ахаб хаанаас болж" },
    { question: "Елиагийн анх харсан үүл хэр том хэмжээтэй байсан бэ? ", answer: "Гарын алга шиг дайтай" },
    { question: " Елиа хаана төрсөн бэ? ", answer: "Тишбе" },
    { question: "Ахаб хааны эхнэр хэн бэ?", answer: "Иезебел" }
  ]
];

const Home = () => {
  const [usedQuestions, setUsedQuestions] = useState(
    Array(3).fill(null).map(() => Array(10).fill(false))
  );
  const [selectedCard, setSelectedCard] = useState<{ category: number; index: number } | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [teamScores, setTeamScores] = useState(Array(8).fill(0)); // 8 teams

  const handleCardClick = (categoryIndex: number, questionIndex: number) => {
    if (usedQuestions[categoryIndex][questionIndex]) return;
    setSelectedCard({ category: categoryIndex, index: questionIndex });
    setSelectedTeam(null);
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    
    if (!selectedCard || selectedTeam === null) return;

    const points = (selectedCard.index + 1) * 100;

    setUsedQuestions((prev) => {
      const updated = [...prev];
      updated[selectedCard.category][selectedCard.index] = true;
      return updated;
    });

    setTeamScores((prev) => {
      const updated = [...prev];
      updated[selectedTeam] += points;
      return updated;
    });

    setShowAnswer(true);
  };

  const handleCloseCard = () => setSelectedCard(null);

  return (
    <div className="grid grid-cols-3 gap-24 p-8 min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-24 px-[100px] text-black text-[40px]">
          <h2 className="text-center text-[80px] font-black ">{category}</h2>
          {questions[categoryIndex].map((q, questionIndex) => (
            <div
              key={questionIndex}
              className={`flex items-center justify-center text-white text-[60px] p-16 rounded-xl cursor-pointer transition-all duration-300 ${
                usedQuestions[categoryIndex][questionIndex]
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-900'
              }`}
              onClick={() => handleCardClick(categoryIndex, questionIndex)}
            >
              {`${(questionIndex + 1) * 100} Оноо`}
            </div>
          ))}
        </div>
      ))}

      {selectedCard && (
        <div className="fixed inset-0 flex justify-center items-center text-black bg-black bg-opacity-70 z-50">
          <div className="bg-white p-8 rounded-lg text-center min-w-[80%] min-h-[80%]  max-w-lg relative">
            <h3 className="text-[60px] font-bold mb-8 mt-[20%]">
              {questions[selectedCard.category][selectedCard.index].question}
            </h3>

            <div className="flex justify-center space-x-4 mb-8 mt-[5%]">
              {Array.from({ length: 8 }).map((_, teamIndex) => (
                <button
                  key={teamIndex}
                  className={`px-8 py-4 text-[40px] rounded-lg ${
                    selectedTeam === teamIndex ? 'bg-green-500 text-white' : 'bg-gray-300'
                  }`}
                  onClick={() => setSelectedTeam(teamIndex)}
                >
                  Баг {teamIndex + 1}
                </button>
              ))}
            </div>

            {!showAnswer ? (
              <button
                onClick={handleShowAnswer}
                disabled={selectedTeam === null}
                className={`px-16 py-8 text-[40px] mt-[10%] rounded-lg ${
                  selectedTeam === null ? 'bg-gray-400' : 'bg-blue-500 text-white'
                }`}
              >
                Хариултыг харах
              </button>
            ) : (
              <p className="text-[50px] text-gray-700 mt-[10%]">
                Хариулт: {questions[selectedCard.category][selectedCard.index].answer}
              </p>
            )}

            <button
              onClick={handleCloseCard}
              className="absolute top-4 right-4 bg-red-500 text-white px-6 py-2 text-[40px] rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}

      <div className="col-span-3 mt-16 text-center">
        <h2 className="text-[50px] font-bold mb-8">Team Scores</h2>
        <div className="flex  justify-center space-x-16">
          {teamScores.map((score, teamIndex) => (
            <div
              key={teamIndex}
              className="bg-purple-600 p-8 rounded-xl shadow-md text-[60px] font-bold"
            >
               {teamIndex + 1}-р баг : {score} Оноо
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
