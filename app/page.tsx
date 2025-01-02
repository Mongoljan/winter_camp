
'use client'
import { useState } from 'react';

const categories = ['Math', 'Science', 'History', 'Literature', 'Geography', 'Art', 'Music', 'Pop Culture', 'Sports'];
const points = [100, 200, 300, 400, 500];

const questions = [
  "What is the square root of 144?", 
  "What is the chemical symbol for water?", 
  "Who was the first president of the United States?", 
  "Who wrote 'Romeo and Juliet'?", 
  "What is the capital of Japan?", 
  "Who painted the 'Starry Night'?", 
  "Which composer wrote 'Fur Elise'?", 
  "Who won the first season of 'The Voice' in the U.S.?", 
  "How many players are there on a soccer team?", 
  "Who is the founder of Microsoft?", 
  "What is 15 multiplied by 3?", 
  "What planet is known as the 'Red Planet'?", 
  "In what year did the Titanic sink?", 
  "What novel begins with the line 'Call me Ishmael'?", 
  "What is the largest continent by land area?", 
  "What movement is Picasso known for founding?", 
  "What is the name of the famous music festival held in the desert in California?", 
  "What is the name of the wizarding school in the 'Harry Potter' series?", 
  "In what year did the first modern Olympic Games take place?", 
  "Who is known as the 'father of the internet'?", 
  "How many degrees are in a triangle?", 
  "What is the chemical element for gold?", 
  "Which famous explorer is credited with discovering America in 1492?", 
  "Who is the author of the 'Harry Potter' series?", 
  "Which river is the longest in the world?", 
  "Who sculpted the statue of David?", 
  "Which band released the album 'Abbey Road'?"
];

const images = [
  '/images/math.jpg', '/images/science.jpg', '/images/history.jpg', '/images/literature.jpg', '/images/geography.jpg', '/images/art.jpg',
  '/images/music.jpg', '/images/pop-culture.jpg', '/images/sports.jpg'
];

const Home = () => {
  const [cardStates, setCardStates] = useState(
    Array(27).fill({ used: false, showAnswer: false })
  );
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    if (cardStates[index].used) return; // Prevent clicking used cards
    setSelectedCard(index);
    setCardStates(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = { ...updatedState[index], showAnswer: true };
      return updatedState;
    });
  };

  const handleCloseCard = () => {
    if (selectedCard === null) return;

    setCardStates(prevState => {
      const updatedState = [...prevState];
      updatedState[selectedCard] = { ...updatedState[selectedCard], used: true, showAnswer: false };
      return updatedState;
    });
    setSelectedCard(null); // Deselect the card after closing
  };

  return (
    <div className="relative grid grid-cols-9 grid-rows-6 gap-6 p-8 min-h-screen bg-gradient-to-r from-green-100 to-blue-200">
      {/* Categories at the top */}
      <div className="col-span-9 flex justify-between mb-4 text-xl font-semibold text-gray-800">
        {categories.map((category, colIndex) => (
          <div key={colIndex} className="text-center">{category}</div>
        ))}
      </div>

      {/* Cards grid with points on the card */}
      {cardStates.map((card, index) => {
        const row = Math.floor(index / 9); // Row based on the index
        const col = index % 9; // Column based on the index
        const question = questions[index % questions.length]; // Get the question based on index

        return (
          <div
            key={index}
            className={`relative flex items-center justify-center p-6 border-2 border-gray-600 rounded-xl bg-green-50 cursor-pointer transition-all duration-300 transform 
              ${card.showAnswer ? 'scale-110 z-10' : 'hover:scale-105'} 
              ${card.used ? 'opacity-50 cursor-not-allowed' : ''} 
              ${selectedCard === index ? 'absolute inset-0 z-50' : ''}
              `}
            onClick={() => handleCardClick(index)}
          >
            <div className="relative w-full h-full flex justify-center items-center text-2xl font-bold text-gray-800">
              {/* Card with the number of points */}
              {!card.showAnswer ? (
                <>
                  <div className="absolute top-2 right-2 bg-gray-700 text-white py-2 px-4 rounded-lg">
                    {points[row]}
                  </div>
                  <img 
                    src={images[col % images.length]} 
                    alt="Category image" 
                    className="absolute inset-0 object-cover w-full h-full opacity-20 rounded-xl" 
                  />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-black opacity-70 z-40 rounded-xl"></div>
                  <div className="relative text-xl font-semibold text-white p-6 bg-white text-black rounded-xl z-50">
                    {/* Display the question inside the expanded card */}
                    <div className="text-3xl font-semibold">{question}</div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent this click event from propagating to the card click
                        handleCloseCard();
                      }}
                      className="absolute bottom-2 left-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
      
      {/* Dark overlay for selected card */}
      {selectedCard !== null && (
        <div className="absolute inset-0 bg-black opacity-60 z-40"></div>
      )}

      {/* Center the expanded card */}
      {selectedCard !== null && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative w-[80%] h-[80%] bg-white rounded-xl overflow-hidden transition-all duration-500">
            {/* Display the question inside the expanded card */}
            <div className="flex justify-center items-center text-4xl font-semibold p-8 text-center text-gray-800">
              {questions[selectedCard]}
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent this click event from propagating to the card click
                handleCloseCard();
              }}
              className="absolute top-2 right-2 px-6 py-3 bg-red-500 text-white rounded-lg"
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
