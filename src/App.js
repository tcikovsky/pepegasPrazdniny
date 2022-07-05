import "./styles.css";
import Row from "./Row";
import DATES from "./dates";
import styled from "styled-components";
import { useEffect, useState } from "react";

const oneDay = 24 * 60 * 60 * 1000;
const firstDateInMillis = 1659304800000;
const date = { month: 0, day: 0 };

const convertDatesToParams = (startDate, endDate) => {
  const graphStart = new Date(2022, 7, 1);
  const graphMilli = graphStart.getTime() / oneDay;

  const startMilli = startDate.getTime() / oneDay;
  const endMilli = endDate.getTime() / oneDay;

  return {
    start: startMilli - graphMilli,
    size: endMilli - startMilli
  };
};

const getRandomColor = () => {
  const randNum1 = Math.floor(Math.random() * (255 - 0) + 0);
  const randNum2 = Math.floor(Math.random() * (255 - 0) + 0);
  const randNum3 = Math.floor(Math.random() * (255 - 0) + 0);

  return `rgb(${randNum1}, ${randNum2}, ${randNum3})`;
};

const getNumOfBlocks = () => {
  let numOfBlocks = 0;
  DATES.forEach((person) => {
    if (person !== false) {
      numOfBlocks += person.length;
    }
  });

  return numOfBlocks;
};

const numOfBlocks = getNumOfBlocks();

const colors = [];

for (let i = 0; i < numOfBlocks; i++) {
  colors.push(getRandomColor());
}

const NameList = styled.ul`
  position: absolute;
  left: 10px;
  margin: 20px 0px;
  padding: 0px;
  height: 650px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
  }
`;

const Line = styled.div`
  height: 100%;
  width: 2px;
  background-color: black;
  margin: 0;
`;

const DateDiv = styled.div`
  position: absolute;
  top: 20px;
  background-color: gray;
  padding: 5px;
  border: solid 2px black;
`;

export default function App() {
  const rows = [];
  let keyCounter = 0;
  let topCounter = 0;
  const [updateNum, forceUpdate] = useState(0);

  useEffect(() => {
    const movingMouse = (e) => {
      const line = document.querySelector("#line");
      const dateDiv = document.querySelector("#dateDiv");

      line.style.position = "absolute";
      const left = 14.82004234297812;
      const right = 94.00141143260409;
      const leftBorder = (window.innerWidth / 100) * left;
      const rightBorder = (window.innerWidth / 100) * right;

      if (e.clientX < leftBorder) {
        line.style.left = leftBorder + "px";
        dateDiv.style.left = leftBorder + "px";
      } else if (e.clientX > rightBorder) {
        line.style.left = rightBorder + "px";
        dateDiv.style.left = rightBorder + "px";
      } else {
        line.style.left = e.clientX + "px";
        dateDiv.style.left = e.clientX + "px";
      }

      dateDiv.style.top = e.clientY - 40 + "px";

      const hundredth = window.innerWidth / 100;
      const leftInPercent =
        (Math.abs(left - e.clientX / hundredth) / 79.2222) * 100;
      const TOTAL_MILLIS = oneDay * 61;
      const leftMillis = (TOTAL_MILLIS / 100) * leftInPercent;
      const fullDate = new Date(firstDateInMillis + leftMillis);
      date.month = fullDate.getMonth();
      date.day = fullDate.getDate();
      forceUpdate(updateNum + 1);
    };

    document.addEventListener("mousemove", movingMouse);
  });

  DATES.forEach((person) => {
    if (person !== false) {
      const datas = [];
      person.forEach((date) => {
        const startDate = date.start;
        const endDate = date.end;
        const blockData = convertDatesToParams(startDate, endDate);

        const data = {
          size: blockData.size,
          start: blockData.start,
          num: topCounter,
          color: colors[keyCounter]
        };

        datas.push(data);
      });
      rows.push(<Row data={datas} key={keyCounter} />);
    } else {
      const data = [
        {
          size: 0,
          start: 0,
          num: topCounter,
          color: colors[keyCounter]
        }
      ];

      rows.push(<Row data={data} key={keyCounter} />);
    }
    keyCounter++;
    topCounter++;
  });

  return (
    <div className="App">
      {rows}
      <NameList>
        <li>Juraj</li>
        <li>Nina</li>
        <li>Cicko</li>
        <li>Andrej</li>
        <li>Linhart</li>
        <li>Rea</li>
        <li>Matus</li>
        <li>Adam</li>
        <li>Tomas</li>
        <li>Dominik</li>
      </NameList>

      <Line id="line"></Line>
      <DateDiv id="dateDiv">{`${date.day}.${date.month}.`}</DateDiv>
    </div>
  );
}
