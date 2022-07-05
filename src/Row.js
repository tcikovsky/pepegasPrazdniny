import styled from "styled-components";

const TheBlock = styled.div`
  border: black solid 2px;
  margin: 20px 0px 20px 10%;
  width: ${(props) => (props.size / 61) * 80}%;
  height: 50px;
  position: absolute;
  left: ${(props) => (props.start / 61) * 80}%;
  top: ${(props) => props.num * 70}px;
  background-color: ${(props) => props.color};
`;

const Row = (props) => {
  let keyCounter = 0;

  const renderRows = props.data.map((block) => {
    keyCounter++;
    return (
      <TheBlock
        size={block.size}
        color={block.color}
        num={block.num}
        start={block.start}
        key={keyCounter}
      >
        <div className="theBlock" key={keyCounter}></div>
      </TheBlock>
    );
  });

  return <div>{renderRows}</div>;
};

export default Row;
