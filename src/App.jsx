import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import badge from './image.png'

const fadeInOut = keyframes`
  0% { opacity: 0; transform: scale(0.5); }
  20% { opacity: 1; transform: scale(2); }
  50% { opacity: 1; transform: scale(2); }
  80% { opacity: 0.5; transform: scale(1); }
  100% { opacity: 0; transform: scale(0); }
`;

const CalendarWrapper = styled.div`
  .react-datepicker__day--highlighted-custom-selected {
    border-radius: 50%;
    background-color: #4caf50;
    color: white;
  }

  .react-datepicker__day:hover {
    background-color: #d4f0d0;
    border-radius: 50%;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  animation: ${fadeInOut} 5s linear;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const App = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [showImage, setShowImage] = useState(false);

  const handleDateClick = (date) => {
    const isAlreadySelected = selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );

    if (isAlreadySelected) {
      // 이미 선택된 날짜 제거
      setSelectedDates(
        selectedDates.filter(
          (selectedDate) => selectedDate.toDateString() !== date.toDateString()
        )
      );
    } else {
      // 새로운 날짜 추가
      setSelectedDates([...selectedDates, date]);
    }
  };

  useEffect(() => {
    if (selectedDates.length === 7) {
      // 이미지 표시
      setShowImage(true);

      // 2초 후 이미지 사라짐 + 선택 날짜 초기화
      const timer = setTimeout(() => {
        setShowImage(false);
        setSelectedDates([]);
      }, 2000);

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }
  }, [selectedDates]);

  return (
    <CenterWrapper>
      <CalendarWrapper>
        <h1>Daily Check</h1>
        <DatePicker
          selected={null} // 단일 선택 상태를 비활성화
          onChange={handleDateClick}
          inline
          highlightDates={selectedDates} // 다중 날짜 하이라이트
          dayClassName={(date) =>
            selectedDates.some(
              (selectedDate) => selectedDate.toDateString() === date.toDateString()
            )
              ? "react-datepicker__day--highlighted-custom-selected"
              : undefined
          }
        />
        <div>
          <h3>체크 횟수: {selectedDates.length}</h3>
        </div>
        {showImage && (
          <ImageWrapper>
            <img src={badge} alt="축하합니다!" width="200" />
          </ImageWrapper>
        )}
      </CalendarWrapper>
    </CenterWrapper>
  );
};

export default App;