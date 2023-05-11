import React, { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const PieChart = ({ data }) => {
  const [chart, setState] = useState(null);

  useEffect(() => {
    const chartData = [
      {
        category: "Principal",
        value: data.principal,
        "color": am4core.color("#ED1C24")
      },
      {
        category: "Interest",
        value: data.emi,
        color: am4core.color("#FF6F91"),
      },
    ];
    generateChart(chartData);

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [data]);

  const generateChart = (data) => {
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.colors.list = [
     
      am4core.color("#FFC75F"),
      am4core.color("#F9F871")
    ];
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.data = [...data];
    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "category";
    chart.legend = new am4charts.Legend();
    setState(chart);
  };

  return (
    <div>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default PieChart;
