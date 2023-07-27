import React from 'react'

const CardSection = ({ data, currency }) => {
  const currencySymbol = currency === 'usd' ? '$' : <span>&#8377; </span>
  const currentPrice = data.info.market_data.current_price[currency]
  const coinName = data.info.name
  const mCap24 = data.info.market_data.market_cap_change_percentage_24h
  const ath = data.info.market_data.ath.usd
  const atl = data.info.market_data.ath.usd
  const sentiment = data.info.sentiment_votes_up_percentage
  const low24 = data.info.market_data.low_24h[currency]
  const high24 = data.info.market_data.high_24h[currency]
  return (
    <div className="card-section">
      <div
        className="fs-1 fw-bold m-3 text-Capitalize"
        style={{
          fontFamily: 'NHaasGroteskDSPro-65Md',
          marginTop: '3px !important',
          marginBottom: '0px !important',
        }}
      >
        <img id="coin-image" src={data.info.image.large}></img>
        {coinName}
      </div>
      <section
        className="row m-1 mb-0"
        style={{ marginTop: ' 2px !important' }}
      >
        <div
          className="card text-white text-center  m-4 "
          style={{
            width: '12rem',
            backgroundColor: 'rgb(43, 43, 43)',
            marginTop: '0px !important',
          }}
        >
          <div className="card-body">
            <h6
              className="card-title"
              style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}
            >
              Market Cap 24Hrs
            </h6>
            <p className="card-text fw-bold fs-5" style={{ color: '#fcdf03' }}>
              {mCap24} %
            </p>
          </div>
        </div>
        <div
          className="card text-white text-center  m-4 "
          style={{
            width: '12rem',
            backgroundColor: 'rgb(43, 43, 43)',
            marginTop: '0px !important',
          }}
        >
          <div className="card-body">
            <h6
              className="card-title"
              style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}
            >
              All Time High
            </h6>
            <p className="card-text fw-bold fs-5" style={{ color: '#fcdf03' }}>
              {currencySymbol} {ath}
            </p>
          </div>
        </div>
        <div
          className="card text-white text-center  m-4 "
          style={{
            width: '12rem',
            backgroundColor: 'rgb(43, 43, 43)',
            marginTop: '0px !important',
          }}
        >
          <div className="card-body">
            <h6
              className="card-title"
              style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}
            >
              All Time low
            </h6>
            <p className="card-text fw-bold fs-5" style={{ color: '#fcdf03' }}>
              {currencySymbol}
              {atl}
            </p>
          </div>
        </div>

        <div
          className="card text-white text-center  m-4 "
          style={{
            width: '12rem',
            backgroundColor: 'rgb(43, 43, 43)',
            marginTop: '0px !important',
          }}
        >
          <div className="card-body">
            <h6
              className="card-title"
              style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}
            >
              Positive Sentiments{' '}
            </h6>
            <p className="card-text fw-bold fs-5" style={{ color: '#fcdf03' }}>
              {sentiment} %
            </p>
          </div>
        </div>
        <div
          className="card text-white text-center  m-4 "
          style={{
            width: '11rem',
            backgroundColor: 'rgb(43, 43, 43)',
            marginTop: '0px !important',
          }}
        >
          <div className="card-body">
            <h6
              className="card-title"
              style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}
            >
              {' '}
              High 24Hrs{' '}
            </h6>
            <p
              className="card-text fw-bold fs-5"
              style={{ color: 'rgb(51, 255, 0) ' }}
            >
              {currencySymbol} {high24}
            </p>
          </div>
        </div>
        <div
          className="card text-white text-center  m-4 "
          style={{
            width: '12rem',
            backgroundColor: 'rgb(43, 43, 43)',
            marginTop: '0px !important',
          }}
        >
          <div className="card-body">
            <h6
              className="card-title"
              style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}
            >
              Low 24Hrs
            </h6>
            <p
              className="card-text fw-bold fs-5"
              style={{ color: 'rgb(255, 32, 32)' }}
            >
              {currencySymbol} {low24}
            </p>
          </div>
        </div>
      </section>
      <div>
        <div
          className="text-white text-center"
          style={{
            fontFamily: 'NHaasGroteskDSPro-65Md',
            overflow: 'visible',
            height: '2px',
            marginTop: '1%',
          }}
        >
          Current Price
        </div>
        <div
          style={{
            fontFamily: 'NHaasGroteskDSPro-65Md',
            fontSize: '90px',
            fontWeight: '700',
            color: '#fcdf03',
            textDecoration: 'none solid rgb(255, 255, 255)',
            textAlign: 'center',
          }}
        >
          {currencySymbol} {currentPrice}
        </div>
      </div>
    </div>
  )
}

export default CardSection
