import React, { useState, useEffect } from "react";

import { PieChart, Pie, Cell } from "recharts";

import "./app.scss";

const data = [
  {name: "НИТ", all: 246051, done: 234840},
  {name: "Прогноз", all: 283500, done: 272289}
];

const MyPieChart = (props) => {
  const { pieData=[] } = props;
  const data1 = [
    {value: 100-pieData[0]},
    {value: pieData[0]}
  ]
  const data2 = [
    {value: 100-pieData[1]},
    {value: pieData[1]}
  ]
  const COLORS1 = ["#e8e8e8", "#ff7d01"]
  const COLORS2 = ["#e8e8e8", "#c4c4c4"]

  console.log(data1)
  return (
      <div className="pieChart">
        <PieChart width={120} height={120}>
          <Pie
              data={data1}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={50}
              innerRadius={29}
              fill="#8884d8"
              endAngle={270}
              paddingAngle={0}
          >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
            ))}
          </Pie>
          <Pie
            data={data2}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            innerRadius={56}
            fill="#8884d8"
            endAngle={270}
            paddingAngle={0}
          >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
            ))}
          </Pie>
        </PieChart>
          <div className="pieChart__bigNmb">
              <span>{pieData[0]}
                <span className="pieChart__bigNmb_prc">%</span>
              </span>
          </div>
          <div className="pieChart__smallNmb">{pieData[1]}<span className="pieChart__smallNmb_prc">%</span></div>
      </div>
  )
}

const App = () => {
  const pieData = [];
  data.forEach(function (item, index){
    pieData[index] = Math.round((item.done/item.all)*100);
  });

  return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="block">
              { pieData.length===2 && <MyPieChart
                pieData={pieData}
              />}
                <div className="stat block__stat">
                    {data.map((item, index)=>(
                        <div className="stat__item" key={index}>
                            <div className="stat__title">{item.name}</div>
                            <div className="stat__nmbrs">{item.done.toLocaleString('ru')} <span className="stat__nmbrs_all">/ {item.all.toLocaleString('ru')}</span></div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
  )
}


export default App;



