import React, { useState } from "react";
import { Slider, InputNumber, Row, Col, ConfigProvider } from "antd";
import { GoDash } from "react-icons/go";

const RangeSlide = () => {
  const [value, setValue] = useState([0, 3000]);

  const onSliderChange = (value) => {
    setValue(value);
  };

  const onInputChange = (index, newValue) => {
    const updatedValue = [...value];
    const numericValue = Number(newValue);
    if (numericValue >= 0 && numericValue <= 3000) {
      updatedValue[index] = numericValue;
      updatedValue.sort((a, b) => a - b);
      setValue(updatedValue);
    }
  };

  const formatValue = (value) => `₹${value}`;

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              dotBorderColor: "#1F487C",
              dotActiveBorderColor: "#1F487C",
              handleActiveColor: "#1F487C",
              handleColorDisabled: "#1F487C",
              handleActiveOutlineColor: "#1F487C",
              handleColor: "#1F487C",
            },
          },
        }}
      >
        <div style={{ padding: 20 }}>
          <h2 className="text-[#444444]">Price Range</h2>
          <Row gutter={16} align="middle">
            <div className="flex justify-between  w-full">
              <div className="">
                <Col span={12} style={{ marginTop: "1vw" }}>
                  {`₹${value[0]}`}
                </Col>
              </div>
              <div>
                <Col span={12} style={{ marginTop: "1vw" }}>
                  {`₹${value[1]}`}
                </Col>
              </div>
            </div>
            <Col span={24} style={{ marginTop: "2vw" }}>
              <Slider
                range
                min={0}
                max={3000}
                value={value}
                onChange={onSliderChange}
                tooltip={{
                  formatter: formatValue,
                  placement: "top",
                }}
                trackStyle={[{ backgroundColor: "#1F487C" }]}
                handleStyle={[
                  { borderColor: "#1F487C", backgroundColor: "#fff" },
                  { borderColor: "#1F487C", backgroundColor: "#fff" },
                ]}

                // theme={{
                //     token: {
                //         dotBorderColor: "black",
                //         dotActiveBorderColor: "black"
                //     }
                // }}
              />
            </Col>
            <div className="flex w-full items-center justify-center">
              <div>
                <Col>
                  <p className="text-[1.1vw] text-[#444444]">Min. Price</p>
                  <InputNumber
                    min={0}
                    max={3000}
                    value={value[0]}
                    onChange={(val) => onInputChange(0, val)}
                    formatter={(value) => `₹${value}`}
                    style={{ width: "100%", color: "#FF0000" }}
                  />
                </Col>
              </div>
              <div className="mt-[1.5vw]">
                <GoDash size="1.2vw" color="#9B9B9B" />
              </div>
              <div>
                <Col>
                  <p className="text-[1.1vw]  text-[#444444]">Max. Price</p>
                  <InputNumber
                    min={0}
                    max={3000}
                    value={value[1]}
                    onChange={(val) => onInputChange(1, val)}
                    formatter={(value) => `₹${value}`}
                    style={{ width: "100%", color: "#9B9B9B" }}
                  />
                </Col>
              </div>
            </div>
          </Row>
        </div>
      </ConfigProvider>
    </>
  );
};

export default RangeSlide;
