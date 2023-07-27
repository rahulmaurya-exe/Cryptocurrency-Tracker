import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'

const ChartSection = ({ data, currency }) => {
  const currencySymbol = currency === 'usd' ? '$' : '₹'
  let priceChange24, MarketCap, TotVol
  if (currency === 'usd') {
    priceChange24 = data.info.market_data.price_change_24h_in_currency.usd
    MarketCap = data.info.market_data.market_cap.usd
    TotVol = data.info.market_data.total_volume.usd
  } else {
    priceChange24 = data.info.market_data.price_change_24h_in_currency.inr
    MarketCap = data.info.market_data.market_cap.inr
    TotVol = data.info.market_data.total_volume.inr
  }
  const Circulating = data.info.market_data['circulating_supply']
  const twitterF = data.info.community_data.twitter_followers
  const [prevId, setPrevId] = useState(data.id)

  const chartInfo = {
    Price: {
      options: {
        chart: {
          id: 'area-datetime',
        },
        grid: {
          show: false,
        },
        title: {
          text: `Market Price`,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#fcdf03',
          },
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          show: false,
        },
        colors: ['#fcdf03'],
        tooltip: {
          y: {
            formatter: (value) => {
              return value.toFixed(2)
            },
          },
          theme: 'dark',
        },
        selection: 365,
      },
      series: [
        {
          name: 'Market Price',
          data: [[1645837250522, 39804.53519937617]],
        },
      ],
    },
    Market_Cap: {
      options: {
        grid: {
          show: false,
        },
        title: {
          text: `Market Cap`,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#ff69f5',
          },
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          show: false,
        },
        colors: ['#ff69f5'],
        tooltip: {
          y: {
            formatter: (value) => {
              return value.toFixed(2)
            },
          },
          theme: 'dark',
        },
      },
      series: [
        {
          name: `Market Cap`,
          data: [[1645837250522, 39804.53519937617]],
        },
      ],
    },
    Tot_Vol: {
      options: {
        grid: {
          show: false,
        },
        title: {
          text: 'Market Volume',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#00ffea',
          },
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          show: false,
        },
        colors: ['#00ffea'],
        tooltip: {
          y: {
            formatter: (value) => {
              return value.toFixed(2)
            },
          },
          theme: 'dark',
        },
      },
      series: [
        {
          name: 'Market Volume',
          data: [[1645837250522, 39804.53519937617]],
        },
      ],
    },
  }
  const [chartData, setChartData] = useState(chartInfo)
  console.log(chartData.Market_Cap.options.title.text)

  const [prevSelection, setPrevSelection] = useState(
    chartInfo.Price.options.selection
  )
  const fetchData = async () => {
    let fetchedChartData = await fetch(
      'https://api.coingecko.com/api/v3/coins/' +
        data.id +
        `/market_chart?vs_currency=${currency}&days=` +
        chartData.Price.options.selection
    )
    let jsonChartData = await fetchedChartData.json()
    setChartData({
      ...chartData,
      Price: {
        options: chartData.Price.options,
        series: [
          {
            name: `${currencySymbol} Market Price`,
            data: jsonChartData.prices,
          },
        ],
      },
      Market_Cap: {
        options: chartData.Market_Cap.options,
        series: [
          {
            name: `${currencySymbol} Market Cape`,
            data: jsonChartData.market_caps,
          },
        ],
      },
      Tot_Vol: {
        options: chartData.Tot_Vol.options,
        series: [
          {
            name: `${currencySymbol} Market Volume`,
            data: jsonChartData.total_volumes,
          },
        ],
      },
    })
  }
  useEffect(() => {
    fetchData()
  }, [chartData.Price.options.selection, data.id, currencySymbol])

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col" style={{ maxWidth: '610px' }}>
            <div id="chart">
              <div className="toolbar ">
                <button
                  id="one_month"
                  onClick={() =>
                    setChartData({
                      ...chartData,
                      Price: {
                        options: { ...chartData.Price.options, selection: 1 },
                        series: chartData.Price.series,
                      },
                    })
                  }
                >
                  1D
                </button>
                &nbsp;
                <button
                  id="six_months"
                  onClick={() =>
                    setChartData({
                      ...chartData,
                      Price: {
                        options: { ...chartData.Price.options, selection: 7 },
                        series: chartData.Price.series,
                      },
                    })
                  }
                >
                  1W
                </button>
                &nbsp;
                <button
                  id="one_year"
                  onClick={() =>
                    setChartData({
                      ...chartData,
                      Price: {
                        options: { ...chartData.Price.options, selection: 30 },
                        series: chartData.Price.series,
                      },
                    })
                  }
                >
                  1M
                </button>
                &nbsp;
                <button
                  id="ytd"
                  onClick={() =>
                    setChartData({
                      ...chartData,
                      Price: {
                        options: { ...chartData.Price.options, selection: 182 },
                        series: chartData.Price.series,
                      },
                    })
                  }
                >
                  6M
                </button>
                &nbsp;
                <button
                  id="all"
                  onClick={() =>
                    setChartData({
                      ...chartData,
                      Price: {
                        options: { ...chartData.Price.options, selection: 365 },
                        series: chartData.Price.series,
                      },
                    })
                  }
                >
                  1Y
                </button>
              </div>
              <Chart
                options={chartData.Price.options}
                series={chartData.Price.series}
                type="area"
                height="400"
                width="600"
              />
            </div>
          </div>
          <div className="col" style={{ maxWidth: '250px' }}>
            <div className="card-body ">
              <h6
                className="card-title"
                style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}
              >
                Market Cap{' '}
              </h6>
              <p
                className="card-text fw-bold "
                style={{
                  fontFamily: 'NHaasGroteskDSPro-65Md',
                  color: 'rgb(255, 255, 255)',
                  fontSize: 'small',
                }}
              >
                {currencySymbol} {MarketCap}
              </p>
            </div>

            <div className="card-body ">
              <h6
                className="card-title"
                style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}
              >
                Price Change 24hrs{' '}
              </h6>
              <p
                className="card-text fw-bold "
                style={{
                  fontFamily: 'NHaasGroteskDSPro-65Md',
                  color: 'rgb(255, 255, 255)',
                  fontSize: 'small',
                }}
              >
                {currencySymbol} {priceChange24}
              </p>
            </div>
            <div className="card-body ">
              <h6
                className="card-title"
                style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}
              >
                Total Volume{' '}
              </h6>
              <p
                className="card-text fw-bold "
                style={{
                  fontFamily: 'NHaasGroteskDSPro-65Md',
                  color: 'rgb(255, 255, 255)',
                  fontSize: 'small',
                }}
              >
                {currencySymbol} {TotVol}
              </p>
            </div>
            <div className="card-body ">
              <h6
                className="card-title"
                style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}
              >
                Circulating Supply
              </h6>
              <p
                className="card-text fw-bold "
                style={{
                  fontFamily: 'NHaasGroteskDSPro-65Md',
                  color: 'rgb(255, 255, 255)',
                  fontSize: 'small',
                }}
              >
                {Circulating}
              </p>
            </div>
            <div className="card-body ">
              <h6
                className="card-title"
                style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}
              >
                Twitter Followers
              </h6>
              <p
                className="card-text fw-bold "
                style={{
                  fontFamily: 'NHaasGroteskDSPro-65Md',
                  color: 'rgb(255, 255, 255)',
                  fontSize: 'small',
                }}
              >
                {twitterF}
              </p>
            </div>
          </div>
          <div className="col" style={{ maxWidth: '310px' }}>
            <div>
              <Chart
                options={chartData.Market_Cap.options}
                series={chartData.Market_Cap.series}
                type="line"
                height="200"
                width="300"
              />
            </div>
            <div>
              <Chart
                options={chartData.Tot_Vol.options}
                series={chartData.Tot_Vol.series}
                type="line"
                height="200"
                width="300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartSection
