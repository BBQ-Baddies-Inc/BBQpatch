import React from "react";
import styled from "styled-components";
import {
  MontserratLightWhite14px,
  MontserratSemiBoldWhite14px
} from "../../styledMixins";
import "./Desktop5.css";

function Desktop5(props) {
  const { image5, text1, text2, title, fromThePatch } = props;

  return (
    <div className="container-center-horizontal">
      <div className="desktop-5 screen">
        <OverlapGroup2>
          <OverlapGroup>
            <Vector src="https://anima-uploads.s3.amazonaws.com/projects/61a27368a28b3fe153421fed/releases/61a27df2b025b40396416fc4/img/vector@1x.svg" />
            <Image5 src={image5} />
          </OverlapGroup>
          <ImageText>
            <Text1>{text1}</Text1>
            <FlexRow>
              <Text2>{text2}</Text2>
              <OverlapGroup1>
                <Title>{title}</Title>
                <FromThePatch>{fromThePatch}</FromThePatch>
              </OverlapGroup1>
            </FlexRow>
          </ImageText>
        </OverlapGroup2>
      </div>
    </div>
  );
}

const OverlapGroup2 = styled.div`
  width: 908px;
  height: 769px;
  position: relative;
  margin-left: 8px;
  margin-top: -22px;
`;

const OverlapGroup = styled.div`
  position: absolute;
  width: 723px;
  height: 769px;
  top: 0;
  left: 90px;
`;

const Vector = styled.img`
  position: absolute;
  width: 723px;
  height: 590px;
  top: 96px;
  left: 0;
`;

const Image5 = styled.img`
  position: absolute;
  width: 609px;
  height: 769px;
  top: 0;
  left: 17px;
  object-fit: cover;
`;

const ImageText = styled.div`
  position: absolute;
  width: 908px;
  top: 302px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 234px;
`;

const Text1 = styled.div`
  ${MontserratSemiBoldWhite14px}
  width: 146px;
  min-height: 18px;
  letter-spacing: 0;
`;

const FlexRow = styled.div`
  height: 208px;
  margin-top: 8px;
  display: flex;
  align-items: flex-start;
  min-width: 900px;
`;

const Text2 = styled.p`
  ${MontserratLightWhite14px}
  width: 336px;
  min-height: 62px;
  letter-spacing: 0;
`;

const OverlapGroup1 = styled.div`
  width: 368px;
  height: 182px;
  position: relative;
  align-self: flex-end;
  margin-left: 196px;
`;

const Title = styled.h1`
  position: absolute;
  width: 368px;
  top: 0;
  left: 0;
  font-family: var(--font-family-montserrat);
  font-weight: 700;
  color: var(--white);
  font-size: var(--font-size-xxxl);
  letter-spacing: 0;
`;

const FromThePatch = styled.div`
  position: absolute;
  width: 143px;
  top: 37px;
  left: 195px;
  font-family: var(--font-family-mr_dafoe);
  font-weight: 400;
  color: #9e900b;
  font-size: var(--font-size-l);
  letter-spacing: 0;
`;

export default Desktop5;
