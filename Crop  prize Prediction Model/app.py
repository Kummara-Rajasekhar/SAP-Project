import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from statsmodels.tsa.arima.model import ARIMA
from datetime import datetime, timedelta
import warnings
from io import StringIO
warnings.filterwarnings('ignore')

# Page configuration
st.set_page_config(
    page_title="Crop Price Prediction System",
    page_icon="🌾",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        color: #2E8B57;
        text-align: center;
        margin-bottom: 2rem;
    }
    .crop-card {
        background-color: #f0f8f0;
        padding: 1.5rem;
        border-radius: 15px;
        margin: 1rem 0;
        border-left: 5px solid #2E8B57;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .metric-card {
        background-color: #e8f5e8;
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
    }
    .forecast-value {
        font-size: 1.2rem;
        font-weight: bold;
        color: #2E8B57;
    }
    .price-trend {
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }
    .stSelectbox > div > div > select {
        background-color: #f0f8f0;
    }
</style>
""", unsafe_allow_html=True)

@st.cache_data
def load_dataset():
    """Load and cache the complete dataset"""
    try:
        # Read the uploaded CSV file
        data = """Crop,Year,Month,Average_Wholesale_Price (Rs/quintal),Market_Name
cotton,2020,January,1762,Andhra Pradesh
cotton,2020,February,3856,Andhra Pradesh
cotton,2020,March,1409,Andhra Pradesh
cotton,2020,April,1039,Andhra Pradesh
cotton,2020,May,1158,Andhra Pradesh
cotton,2020,June,2631,Andhra Pradesh
cotton,2020,July,2548,Andhra Pradesh
cotton,2020,August,1423,Andhra Pradesh
cotton,2020,September,3676,Andhra Pradesh
cotton,2020,October,3882,Andhra Pradesh
cotton,2020,November,3110,Andhra Pradesh
cotton,2020,December,1064,Andhra Pradesh
cotton,2021,January,3385,Andhra Pradesh
cotton,2021,February,3985,Andhra Pradesh
cotton,2021,March,1741,Andhra Pradesh
cotton,2021,April,2098,Andhra Pradesh
cotton,2021,May,3853,Andhra Pradesh
cotton,2021,June,2190,Andhra Pradesh
cotton,2021,July,3028,Andhra Pradesh
cotton,2021,August,1101,Andhra Pradesh
cotton,2021,September,3437,Andhra Pradesh
cotton,2021,October,1885,Andhra Pradesh
cotton,2021,November,3412,Andhra Pradesh
cotton,2021,December,3166,Andhra Pradesh
cotton,2022,January,3096,Andhra Pradesh
cotton,2022,February,1775,Andhra Pradesh
cotton,2022,March,1058,Andhra Pradesh
cotton,2022,April,2045,Andhra Pradesh
cotton,2022,May,2673,Andhra Pradesh
cotton,2022,June,1382,Andhra Pradesh
cotton,2022,July,3029,Andhra Pradesh
cotton,2022,August,3347,Andhra Pradesh
cotton,2022,September,1661,Andhra Pradesh
cotton,2022,October,1998,Andhra Pradesh
cotton,2022,November,2318,Andhra Pradesh
cotton,2022,December,2738,Andhra Pradesh
cotton,2023,January,2234,Andhra Pradesh
cotton,2023,February,3646,Andhra Pradesh
cotton,2023,March,2604,Andhra Pradesh
cotton,2023,April,2622,Andhra Pradesh
cotton,2023,May,2042,Andhra Pradesh
cotton,2023,June,2104,Andhra Pradesh
cotton,2023,July,1619,Andhra Pradesh
cotton,2023,August,1120,Andhra Pradesh
cotton,2023,September,3894,Andhra Pradesh
cotton,2023,October,3941,Andhra Pradesh
cotton,2023,November,2068,Andhra Pradesh
cotton,2023,December,2718,Andhra Pradesh
cotton,2024,January,3931,Andhra Pradesh
cotton,2024,February,3393,Andhra Pradesh
cotton,2024,March,2950,Andhra Pradesh
cotton,2024,April,2560,Andhra Pradesh
cotton,2024,May,3082,Andhra Pradesh
cotton,2024,June,1880,Andhra Pradesh
cotton,2024,July,2127,Andhra Pradesh
cotton,2024,August,3929,Andhra Pradesh
cotton,2024,September,2493,Andhra Pradesh
cotton,2024,October,1424,Andhra Pradesh
cotton,2024,November,3925,Andhra Pradesh
cotton,2024,December,2331,Andhra Pradesh
horsegram,2020,January,1590,Andhra Pradesh
horsegram,2020,February,3267,Andhra Pradesh
horsegram,2020,March,2909,Andhra Pradesh
horsegram,2020,April,3455,Andhra Pradesh
horsegram,2020,May,2173,Andhra Pradesh
horsegram,2020,June,2728,Andhra Pradesh
horsegram,2020,July,2449,Andhra Pradesh
horsegram,2020,August,1718,Andhra Pradesh
horsegram,2020,September,1165,Andhra Pradesh
horsegram,2020,October,3389,Andhra Pradesh
horsegram,2020,November,2802,Andhra Pradesh
horsegram,2020,December,1810,Andhra Pradesh
horsegram,2021,January,2459,Andhra Pradesh
horsegram,2021,February,2318,Andhra Pradesh
horsegram,2021,March,1795,Andhra Pradesh
horsegram,2021,April,1020,Andhra Pradesh
horsegram,2021,May,2842,Andhra Pradesh
horsegram,2021,June,3726,Andhra Pradesh
horsegram,2021,July,2102,Andhra Pradesh
horsegram,2021,August,3144,Andhra Pradesh
horsegram,2021,September,1659,Andhra Pradesh
horsegram,2021,October,2263,Andhra Pradesh
horsegram,2021,November,1651,Andhra Pradesh
horsegram,2021,December,3676,Andhra Pradesh
horsegram,2022,January,2147,Andhra Pradesh
horsegram,2022,February,2559,Andhra Pradesh
horsegram,2022,March,2250,Andhra Pradesh
horsegram,2022,April,2782,Andhra Pradesh
horsegram,2022,May,1145,Andhra Pradesh
horsegram,2022,June,1752,Andhra Pradesh
horsegram,2022,July,1598,Andhra Pradesh
horsegram,2022,August,2626,Andhra Pradesh
horsegram,2022,September,1344,Andhra Pradesh
horsegram,2022,October,2135,Andhra Pradesh
horsegram,2022,November,1436,Andhra Pradesh
horsegram,2022,December,3064,Andhra Pradesh
horsegram,2023,January,1394,Andhra Pradesh
horsegram,2023,February,1557,Andhra Pradesh
horsegram,2023,March,2448,Andhra Pradesh
horsegram,2023,April,3874,Andhra Pradesh
horsegram,2023,May,3969,Andhra Pradesh
horsegram,2023,June,2575,Andhra Pradesh
horsegram,2023,July,3749,Andhra Pradesh
horsegram,2023,August,1166,Andhra Pradesh
horsegram,2023,September,3685,Andhra Pradesh
horsegram,2023,October,3615,Andhra Pradesh
horsegram,2023,November,1277,Andhra Pradesh
horsegram,2023,December,1969,Andhra Pradesh
horsegram,2024,January,1439,Andhra Pradesh
horsegram,2024,February,1424,Andhra Pradesh
horsegram,2024,March,3268,Andhra Pradesh
horsegram,2024,April,3885,Andhra Pradesh
horsegram,2024,May,1569,Andhra Pradesh
horsegram,2024,June,2344,Andhra Pradesh
horsegram,2024,July,3604,Andhra Pradesh
horsegram,2024,August,2758,Andhra Pradesh
horsegram,2024,September,3736,Andhra Pradesh
horsegram,2024,October,2305,Andhra Pradesh
horsegram,2024,November,1435,Andhra Pradesh
horsegram,2024,December,1426,Andhra Pradesh
jowar,2020,January,2214,Andhra Pradesh
jowar,2020,February,3461,Andhra Pradesh
jowar,2020,March,1380,Andhra Pradesh
jowar,2020,April,3564,Andhra Pradesh
jowar,2020,May,3294,Andhra Pradesh
jowar,2020,June,2544,Andhra Pradesh
jowar,2020,July,3291,Andhra Pradesh
jowar,2020,August,2174,Andhra Pradesh
jowar,2020,September,1391,Andhra Pradesh
jowar,2020,October,1487,Andhra Pradesh
jowar,2020,November,3557,Andhra Pradesh
jowar,2020,December,1143,Andhra Pradesh
jowar,2021,January,3627,Andhra Pradesh
jowar,2021,February,2943,Andhra Pradesh
jowar,2021,March,3405,Andhra Pradesh
jowar,2021,April,2198,Andhra Pradesh
jowar,2021,May,3000,Andhra Pradesh
jowar,2021,June,1849,Andhra Pradesh
jowar,2021,July,2609,Andhra Pradesh
jowar,2021,August,2134,Andhra Pradesh
jowar,2021,September,2524,Andhra Pradesh
jowar,2021,October,1824,Andhra Pradesh
jowar,2021,November,3014,Andhra Pradesh
jowar,2021,December,2547,Andhra Pradesh
jowar,2022,January,3259,Andhra Pradesh
jowar,2022,February,2256,Andhra Pradesh
jowar,2022,March,3172,Andhra Pradesh
jowar,2022,April,1727,Andhra Pradesh
jowar,2022,May,3624,Andhra Pradesh
jowar,2022,June,3762,Andhra Pradesh
jowar,2022,July,2371,Andhra Pradesh
jowar,2022,August,1415,Andhra Pradesh
jowar,2022,September,1123,Andhra Pradesh
jowar,2022,October,3084,Andhra Pradesh
jowar,2022,November,1799,Andhra Pradesh
jowar,2022,December,2003,Andhra Pradesh
jowar,2023,January,3772,Andhra Pradesh
jowar,2023,February,3806,Andhra Pradesh
jowar,2023,March,3207,Andhra Pradesh
jowar,2023,April,2926,Andhra Pradesh
jowar,2023,May,3612,Andhra Pradesh
jowar,2023,June,3532,Andhra Pradesh
jowar,2023,July,3287,Andhra Pradesh
jowar,2023,August,2405,Andhra Pradesh
jowar,2023,September,1924,Andhra Pradesh
jowar,2023,October,2710,Andhra Pradesh
jowar,2023,November,3561,Andhra Pradesh
jowar,2023,December,1496,Andhra Pradesh
jowar,2024,January,3609,Andhra Pradesh
jowar,2024,February,3602,Andhra Pradesh
jowar,2024,March,1959,Andhra Pradesh
jowar,2024,April,3783,Andhra Pradesh
jowar,2024,May,2740,Andhra Pradesh
jowar,2024,June,3161,Andhra Pradesh
jowar,2024,July,1304,Andhra Pradesh
jowar,2024,August,3825,Andhra Pradesh
jowar,2024,September,2327,Andhra Pradesh
jowar,2024,October,1590,Andhra Pradesh
jowar,2024,November,2680,Andhra Pradesh
jowar,2024,December,3522,Andhra Pradesh
maize,2020,January,1219,Andhra Pradesh
maize,2020,February,3790,Andhra Pradesh
maize,2020,March,1585,Andhra Pradesh
maize,2020,April,2674,Andhra Pradesh
maize,2020,May,1884,Andhra Pradesh
maize,2020,June,1195,Andhra Pradesh
maize,2020,July,2829,Andhra Pradesh
maize,2020,August,2108,Andhra Pradesh
maize,2020,September,1667,Andhra Pradesh
maize,2020,October,1668,Andhra Pradesh
maize,2020,November,1024,Andhra Pradesh
maize,2020,December,2026,Andhra Pradesh
maize,2021,January,1601,Andhra Pradesh
maize,2021,February,1811,Andhra Pradesh
maize,2021,March,3242,Andhra Pradesh
maize,2021,April,3249,Andhra Pradesh
maize,2021,May,3598,Andhra Pradesh
maize,2021,June,2807,Andhra Pradesh
maize,2021,July,1126,Andhra Pradesh
maize,2021,August,3382,Andhra Pradesh
maize,2021,September,3553,Andhra Pradesh
maize,2021,October,3357,Andhra Pradesh
maize,2021,November,3274,Andhra Pradesh
maize,2021,December,1827,Andhra Pradesh
maize,2022,January,1438,Andhra Pradesh
maize,2022,February,2998,Andhra Pradesh
maize,2022,March,2283,Andhra Pradesh
maize,2022,April,3779,Andhra Pradesh
maize,2022,May,2064,Andhra Pradesh
maize,2022,June,2184,Andhra Pradesh
maize,2022,July,2694,Andhra Pradesh
maize,2022,August,3832,Andhra Pradesh
maize,2022,September,1676,Andhra Pradesh
maize,2022,October,2730,Andhra Pradesh
maize,2022,November,3364,Andhra Pradesh
maize,2022,December,2313,Andhra Pradesh
maize,2023,January,3590,Andhra Pradesh
maize,2023,February,3858,Andhra Pradesh
maize,2023,March,2081,Andhra Pradesh
maize,2023,April,1263,Andhra Pradesh
maize,2023,May,3222,Andhra Pradesh
maize,2023,June,2539,Andhra Pradesh
maize,2023,July,3315,Andhra Pradesh
maize,2023,August,1915,Andhra Pradesh
maize,2023,September,3372,Andhra Pradesh
maize,2023,October,1657,Andhra Pradesh
maize,2023,November,3010,Andhra Pradesh
maize,2023,December,2763,Andhra Pradesh
maize,2024,January,2832,Andhra Pradesh
maize,2024,February,2601,Andhra Pradesh
maize,2024,March,1187,Andhra Pradesh
maize,2024,April,1712,Andhra Pradesh
maize,2024,May,2038,Andhra Pradesh
maize,2024,June,3292,Andhra Pradesh
maize,2024,July,1186,Andhra Pradesh
maize,2024,August,3163,Andhra Pradesh
maize,2024,September,1825,Andhra Pradesh
maize,2024,October,1065,Andhra Pradesh
maize,2024,November,2082,Andhra Pradesh
maize,2024,December,3508,Andhra Pradesh
moong,2020,January,2199,Andhra Pradesh
moong,2020,February,1532,Andhra Pradesh
moong,2020,March,1885,Andhra Pradesh
moong,2020,April,2937,Andhra Pradesh
moong,2020,May,2946,Andhra Pradesh
moong,2020,June,1035,Andhra Pradesh
moong,2020,July,3071,Andhra Pradesh
moong,2020,August,3092,Andhra Pradesh
moong,2020,September,1896,Andhra Pradesh
moong,2020,October,1263,Andhra Pradesh
moong,2020,November,1216,Andhra Pradesh
moong,2020,December,2566,Andhra Pradesh
moong,2021,January,3825,Andhra Pradesh
moong,2021,February,2735,Andhra Pradesh
moong,2021,March,2655,Andhra Pradesh
moong,2021,April,2531,Andhra Pradesh
moong,2021,May,1354,Andhra Pradesh
moong,2021,June,1249,Andhra Pradesh
moong,2021,July,3104,Andhra Pradesh
moong,2021,August,1216,Andhra Pradesh
moong,2021,September,3573,Andhra Pradesh
moong,2021,October,2757,Andhra Pradesh
moong,2021,November,2358,Andhra Pradesh
moong,2021,December,3413,Andhra Pradesh
moong,2022,January,2019,Andhra Pradesh
moong,2022,February,2518,Andhra Pradesh
moong,2022,March,3035,Andhra Pradesh
moong,2022,April,2062,Andhra Pradesh
moong,2022,May,3557,Andhra Pradesh
moong,2022,June,1555,Andhra Pradesh
moong,2022,July,2020,Andhra Pradesh
moong,2022,August,2047,Andhra Pradesh
moong,2022,September,1257,Andhra Pradesh
moong,2022,October,2375,Andhra Pradesh
moong,2022,November,3575,Andhra Pradesh
moong,2022,December,2369,Andhra Pradesh
moong,2023,January,2138,Andhra Pradesh
moong,2023,February,1373,Andhra Pradesh
moong,2023,March,3257,Andhra Pradesh
moong,2023,April,2163,Andhra Pradesh
moong,2023,May,2959,Andhra Pradesh
moong,2023,June,1251,Andhra Pradesh
moong,2023,July,1261,Andhra Pradesh
moong,2023,August,3569,Andhra Pradesh
moong,2023,September,1309,Andhra Pradesh
moong,2023,October,3158,Andhra Pradesh
moong,2023,November,1049,Andhra Pradesh
moong,2023,December,3668,Andhra Pradesh
moong,2024,January,3713,Andhra Pradesh
moong,2024,February,3813,Andhra Pradesh
moong,2024,March,3487,Andhra Pradesh
moong,2024,April,2111,Andhra Pradesh
moong,2024,May,3296,Andhra Pradesh
moong,2024,June,1488,Andhra Pradesh
moong,2024,July,1637,Andhra Pradesh
moong,2024,August,3045,Andhra Pradesh
moong,2024,September,1402,Andhra Pradesh
moong,2024,October,3515,Andhra Pradesh
moong,2024,November,2396,Andhra Pradesh
moong,2024,December,1367,Andhra Pradesh
ragi,2020,January,1924,Andhra Pradesh
ragi,2020,February,1969,Andhra Pradesh
ragi,2020,March,2788,Andhra Pradesh
ragi,2020,April,2603,Andhra Pradesh
ragi,2020,May,3127,Andhra Pradesh
ragi,2020,June,2812,Andhra Pradesh
ragi,2020,July,1807,Andhra Pradesh
ragi,2020,August,1237,Andhra Pradesh
ragi,2020,September,1453,Andhra Pradesh
ragi,2020,October,2440,Andhra Pradesh
ragi,2020,November,3598,Andhra Pradesh
ragi,2020,December,2868,Andhra Pradesh
ragi,2021,January,2102,Andhra Pradesh
ragi,2021,February,2667,Andhra Pradesh
ragi,2021,March,2902,Andhra Pradesh
ragi,2021,April,1577,Andhra Pradesh
ragi,2021,May,1969,Andhra Pradesh
ragi,2021,June,1850,Andhra Pradesh
ragi,2021,July,1252,Andhra Pradesh
ragi,2021,August,1121,Andhra Pradesh
ragi,2021,September,3040,Andhra Pradesh
ragi,2021,October,2051,Andhra Pradesh
ragi,2021,November,2908,Andhra Pradesh
ragi,2021,December,1692,Andhra Pradesh
ragi,2022,January,3100,Andhra Pradesh
ragi,2022,February,2244,Andhra Pradesh
ragi,2022,March,3679,Andhra Pradesh
ragi,2022,April,1508,Andhra Pradesh
ragi,2022,May,1717,Andhra Pradesh
ragi,2022,June,1668,Andhra Pradesh
ragi,2022,July,1988,Andhra Pradesh
ragi,2022,August,2675,Andhra Pradesh
ragi,2022,September,1855,Andhra Pradesh
ragi,2022,October,3702,Andhra Pradesh
ragi,2022,November,1482,Andhra Pradesh
ragi,2022,December,2186,Andhra Pradesh
ragi,2023,January,1020,Andhra Pradesh
ragi,2023,February,3665,Andhra Pradesh
ragi,2023,March,2559,Andhra Pradesh
ragi,2023,April,2508,Andhra Pradesh
ragi,2023,May,3498,Andhra Pradesh
ragi,2023,June,1811,Andhra Pradesh
ragi,2023,July,1767,Andhra Pradesh
ragi,2023,August,1278,Andhra Pradesh
ragi,2023,September,1772,Andhra Pradesh
ragi,2023,October,3580,Andhra Pradesh
ragi,2023,November,1012,Andhra Pradesh
ragi,2023,December,1032,Andhra Pradesh
ragi,2024,January,2689,Andhra Pradesh
ragi,2024,February,2751,Andhra Pradesh
ragi,2024,March,3088,Andhra Pradesh
ragi,2024,April,3380,Andhra Pradesh
ragi,2024,May,2929,Andhra Pradesh
ragi,2024,June,1414,Andhra Pradesh
ragi,2024,July,3938,Andhra Pradesh
ragi,2024,August,3099,Andhra Pradesh
ragi,2024,September,3446,Andhra Pradesh
ragi,2024,October,2980,Andhra Pradesh
ragi,2024,November,2331,Andhra Pradesh
ragi,2024,December,2142,Andhra Pradesh
rice,2020,January,1925,Andhra Pradesh
rice,2020,February,2859,Andhra Pradesh
rice,2020,March,1549,Andhra Pradesh
rice,2020,April,1060,Andhra Pradesh
rice,2020,May,2516,Andhra Pradesh
rice,2020,June,3661,Andhra Pradesh
rice,2020,July,3293,Andhra Pradesh
rice,2020,August,3723,Andhra Pradesh
rice,2020,September,3185,Andhra Pradesh
rice,2020,October,2980,Andhra Pradesh
rice,2020,November,3792,Andhra Pradesh
rice,2020,December,2251,Andhra Pradesh
rice,2021,January,3103,Andhra Pradesh
rice,2021,February,1593,Andhra Pradesh
rice,2021,March,2513,Andhra Pradesh
rice,2021,April,2521,Andhra Pradesh
rice,2021,May,3771,Andhra Pradesh
rice,2021,June,1941,Andhra Pradesh
rice,2021,July,2813,Andhra Pradesh
rice,2021,August,3887,Andhra Pradesh
rice,2021,September,1623,Andhra Pradesh
rice,2021,October,3106,Andhra Pradesh
rice,2021,November,1294,Andhra Pradesh
rice,2021,December,2854,Andhra Pradesh
rice,2022,January,3790,Andhra Pradesh
rice,2022,February,1943,Andhra Pradesh
rice,2022,March,3649,Andhra Pradesh
rice,2022,April,2558,Andhra Pradesh
rice,2022,May,3996,Andhra Pradesh
rice,2022,June,3327,Andhra Pradesh
rice,2022,July,2426,Andhra Pradesh
rice,2022,August,1001,Andhra Pradesh
rice,2022,September,1977,Andhra Pradesh
rice,2022,October,1775,Andhra Pradesh
rice,2022,November,2316,Andhra Pradesh
rice,2022,December,3043,Andhra Pradesh
rice,2023,January,1510,Andhra Pradesh
rice,2023,February,1888,Andhra Pradesh
rice,2023,March,1311,Andhra Pradesh
rice,2023,April,3370,Andhra Pradesh
rice,2023,May,3731,Andhra Pradesh
rice,2023,June,1943,Andhra Pradesh
rice,2023,July,1551,Andhra Pradesh
rice,2023,August,1570,Andhra Pradesh
rice,2023,September,2896,Andhra Pradesh
rice,2023,October,3225,Andhra Pradesh
rice,2023,November,2937,Andhra Pradesh
rice,2023,December,3798,Andhra Pradesh
rice,2024,January,2727,Andhra Pradesh
rice,2024,February,3782,Andhra Pradesh
rice,2024,March,3756,Andhra Pradesh
rice,2024,April,1600,Andhra Pradesh
rice,2024,May,1591,Andhra Pradesh
rice,2024,June,2552,Andhra Pradesh
rice,2024,July,3131,Andhra Pradesh
rice,2024,August,3342,Andhra Pradesh
rice,2024,September,2351,Andhra Pradesh
rice,2024,October,1777,Andhra Pradesh
rice,2024,November,1232,Andhra Pradesh
rice,2024,December,1342,Andhra Pradesh
sunflower,2020,January,3031,Andhra Pradesh
sunflower,2020,February,3736,Andhra Pradesh
sunflower,2020,March,1090,Andhra Pradesh
sunflower,2020,April,1348,Andhra Pradesh
sunflower,2020,May,1681,Andhra Pradesh
sunflower,2020,June,1262,Andhra Pradesh
sunflower,2020,July,1521,Andhra Pradesh
sunflower,2020,August,1994,Andhra Pradesh
sunflower,2020,September,1119,Andhra Pradesh
sunflower,2020,October,3414,Andhra Pradesh
sunflower,2020,November,1747,Andhra Pradesh
sunflower,2020,December,3244,Andhra Pradesh
sunflower,2021,January,3053,Andhra Pradesh
sunflower,2021,February,1084,Andhra Pradesh
sunflower,2021,March,3282,Andhra Pradesh
sunflower,2021,April,2079,Andhra Pradesh
sunflower,2021,May,1566,Andhra Pradesh
sunflower,2021,June,2199,Andhra Pradesh
sunflower,2021,July,3465,Andhra Pradesh
sunflower,2021,August,3244,Andhra Pradesh
sunflower,2021,September,2143,Andhra Pradesh
sunflower,2021,October,2620,Andhra Pradesh
sunflower,2021,November,2854,Andhra Pradesh
sunflower,2021,December,2027,Andhra Pradesh
sunflower,2022,January,2335,Andhra Pradesh
sunflower,2022,February,1593,Andhra Pradesh
sunflower,2022,March,2606,Andhra Pradesh
sunflower,2022,April,2566,Andhra Pradesh
sunflower,2022,May,1601,Andhra Pradesh
sunflower,2022,June,3638,Andhra Pradesh
sunflower,2022,July,2596,Andhra Pradesh
sunflower,2022,August,3788,Andhra Pradesh
sunflower,2022,September,2077,Andhra Pradesh
sunflower,2022,October,1713,Andhra Pradesh
sunflower,2022,November,1180,Andhra Pradesh
sunflower,2022,December,1135,Andhra Pradesh
sunflower,2023,January,1657,Andhra Pradesh
sunflower,2023,February,2467,Andhra Pradesh
sunflower,2023,March,1619,Andhra Pradesh
sunflower,2023,April,3059,Andhra Pradesh
sunflower,2023,May,2067,Andhra Pradesh
sunflower,2023,June,1942,Andhra Pradesh
sunflower,2023,July,3544,Andhra Pradesh
sunflower,2023,August,3328,Andhra Pradesh
sunflower,2023,September,1387,Andhra Pradesh
sunflower,2023,October,2031,Andhra Pradesh
sunflower,2023,November,2867,Andhra Pradesh
sunflower,2023,December,2152,Andhra Pradesh
sunflower,2024,January,3103,Andhra Pradesh
sunflower,2024,February,3950,Andhra Pradesh
sunflower,2024,March,3390,Andhra Pradesh
sunflower,2024,April,1150,Andhra Pradesh
sunflower,2024,May,1323,Andhra Pradesh
sunflower,2024,June,1598,Andhra Pradesh
sunflower,2024,July,1166,Andhra Pradesh
sunflower,2024,August,2673,Andhra Pradesh
sunflower,2024,September,3962,Andhra Pradesh
sunflower,2024,October,1156,Andhra Pradesh
sunflower,2024,November,2484,Andhra Pradesh
sunflower,2024,December,1227,Andhra Pradesh
wheat,2020,January,3910,Andhra Pradesh
wheat,2020,February,1917,Andhra Pradesh
wheat,2020,March,3552,Andhra Pradesh
wheat,2020,April,1549,Andhra Pradesh
wheat,2020,May,2290,Andhra Pradesh
wheat,2020,June,3812,Andhra Pradesh
wheat,2020,July,1514,Andhra Pradesh
wheat,2020,August,2232,Andhra Pradesh
wheat,2020,September,3294,Andhra Pradesh
wheat,2020,October,2200,Andhra Pradesh
wheat,2020,November,2524,Andhra Pradesh
wheat,2020,December,1211,Andhra Pradesh
wheat,2021,January,2941,Andhra Pradesh
wheat,2021,February,3357,Andhra Pradesh
wheat,2021,March,1273,Andhra Pradesh
wheat,2021,April,3799,Andhra Pradesh
wheat,2021,May,1417,Andhra Pradesh
wheat,2021,June,1766,Andhra Pradesh
wheat,2021,July,2242,Andhra Pradesh
wheat,2021,August,2466,Andhra Pradesh
wheat,2021,September,2335,Andhra Pradesh
wheat,2021,October,3775,Andhra Pradesh
wheat,2021,November,1055,Andhra Pradesh
wheat,2021,December,1236,Andhra Pradesh
wheat,2022,January,1852,Andhra Pradesh
wheat,2022,February,1094,Andhra Pradesh
wheat,2022,March,1475,Andhra Pradesh
wheat,2022,April,1465,Andhra Pradesh
wheat,2022,May,1898,Andhra Pradesh
wheat,2022,June,1912,Andhra Pradesh
wheat,2022,July,3868,Andhra Pradesh
wheat,2022,August,3179,Andhra Pradesh
wheat,2022,September,2125,Andhra Pradesh
wheat,2022,October,3787,Andhra Pradesh
wheat,2022,November,3615,Andhra Pradesh
wheat,2022,December,2174,Andhra Pradesh
wheat,2023,January,3371,Andhra Pradesh
wheat,2023,February,3348,Andhra Pradesh
wheat,2023,March,2228,Andhra Pradesh
wheat,2023,April,1948,Andhra Pradesh
wheat,2023,May,3732,Andhra Pradesh
wheat,2023,June,2707,Andhra Pradesh
wheat,2023,July,2383,Andhra Pradesh
wheat,2023,August,2802,Andhra Pradesh
wheat,2023,September,1001,Andhra Pradesh
wheat,2023,October,2055,Andhra Pradesh
wheat,2023,November,1033,Andhra Pradesh
wheat,2023,December,2700,Andhra Pradesh
wheat,2024,January,2937,Andhra Pradesh
wheat,2024,February,2199,Andhra Pradesh
wheat,2024,March,1499,Andhra Pradesh
wheat,2024,April,2301,Andhra Pradesh
wheat,2024,May,2765,Andhra Pradesh
wheat,2024,June,1675,Andhra Pradesh
wheat,2024,July,1199,Andhra Pradesh
wheat,2024,August,2664,Andhra Pradesh
wheat,2024,September,3392,Andhra Pradesh
wheat,2024,October,2910,Andhra Pradesh
wheat,2024,November,1904,Andhra Pradesh
wheat,2024,December,3826,Andhra Pradesh
onion,2020,January,1099,Andhra Pradesh
onion,2020,February,1504,Andhra Pradesh
onion,2020,March,2141,Andhra Pradesh
onion,2020,April,2263,Andhra Pradesh
onion,2020,May,3906,Andhra Pradesh
onion,2020,June,3908,Andhra Pradesh
onion,2020,July,2808,Andhra Pradesh
onion,2020,August,2253,Andhra Pradesh
onion,2020,September,3982,Andhra Pradesh
onion,2020,October,3620,Andhra Pradesh
onion,2020,November,2489,Andhra Pradesh
onion,2020,December,1922,Andhra Pradesh
onion,2021,January,2899,Andhra Pradesh
onion,2021,February,2051,Andhra Pradesh
onion,2021,March,2043,Andhra Pradesh
onion,2021,April,3417,Andhra Pradesh
onion,2021,May,1446,Andhra Pradesh
onion,2021,June,3385,Andhra Pradesh
onion,2021,July,1451,Andhra Pradesh
onion,2021,August,1370,Andhra Pradesh
onion,2021,September,3479,Andhra Pradesh
onion,2021,October,1833,Andhra Pradesh
onion,2021,November,2854,Andhra Pradesh
onion,2021,December,3150,Andhra Pradesh
onion,2022,January,3054,Andhra Pradesh
onion,2022,February,3340,Andhra Pradesh
onion,2022,March,2210,Andhra Pradesh
onion,2022,April,2625,Andhra Pradesh
onion,2022,May,1714,Andhra Pradesh
onion,2022,June,1582,Andhra Pradesh
onion,2022,July,3253,Andhra Pradesh
onion,2022,August,3146,Andhra Pradesh
onion,2022,September,1246,Andhra Pradesh
onion,2022,October,2263,Andhra Pradesh
onion,2022,November,1877,Andhra Pradesh
onion,2022,December,3179,Andhra Pradesh
onion,2023,January,1595,Andhra Pradesh
onion,2023,February,2222,Andhra Pradesh
onion,2023,March,1806,Andhra Pradesh
onion,2023,April,3161,Andhra Pradesh
onion,2023,May,3162,Andhra Pradesh
onion,2023,June,1826,Andhra Pradesh
onion,2023,July,3192,Andhra Pradesh
onion,2023,August,1107,Andhra Pradesh
onion,2023,September,3637,Andhra Pradesh
onion,2023,October,3953,Andhra Pradesh
onion,2023,November,1863,Andhra Pradesh
onion,2023,December,3527,Andhra Pradesh
onion,2024,January,3301,Andhra Pradesh
onion,2024,February,2000,Andhra Pradesh
onion,2024,March,3210,Andhra Pradesh
onion,2024,April,3614,Andhra Pradesh
onion,2024,May,1662,Andhra Pradesh
onion,2024,June,1177,Andhra Pradesh
onion,2024,July,1507,Andhra Pradesh
onion,2024,August,3761,Andhra Pradesh
onion,2024,September,1674,Andhra Pradesh
onion,2024,October,3152,Andhra Pradesh
onion,2024,November,3451,Andhra Pradesh
onion,2024,December,1594,Andhra Pradesh
tomato,2020,January,1110,Andhra Pradesh
tomato,2020,February,3952,Andhra Pradesh
tomato,2020,March,2723,Andhra Pradesh
tomato,2020,April,1128,Andhra Pradesh
tomato,2020,May,1852,Andhra Pradesh
tomato,2020,June,2436,Andhra Pradesh
tomato,2020,July,1342,Andhra Pradesh
tomato,2020,August,3878,Andhra Pradesh
tomato,2020,September,2708,Andhra Pradesh
tomato,2020,October,3499,Andhra Pradesh
tomato,2020,November,1453,Andhra Pradesh
tomato,2020,December,1705,Andhra Pradesh
tomato,2021,January,3450,Andhra Pradesh
tomato,2021,February,3370,Andhra Pradesh
tomato,2021,March,2233,Andhra Pradesh
tomato,2021,April,1947,Andhra Pradesh
tomato,2021,May,2558,Andhra Pradesh
tomato,2021,June,3216,Andhra Pradesh
tomato,2021,July,1604,Andhra Pradesh
tomato,2021,August,2162,Andhra Pradesh
tomato,2021,September,2316,Andhra Pradesh
tomato,2021,October,3094,Andhra Pradesh
tomato,2021,November,1061,Andhra Pradesh
tomato,2021,December,3385,Andhra Pradesh
tomato,2022,January,2886,Andhra Pradesh
tomato,2022,February,3760,Andhra Pradesh
tomato,2022,March,2102,Andhra Pradesh
tomato,2022,April,1767,Andhra Pradesh
tomato,2022,May,3613,Andhra Pradesh
tomato,2022,June,1459,Andhra Pradesh
tomato,2022,July,2313,Andhra Pradesh
tomato,2022,August,2920,Andhra Pradesh
tomato,2022,September,2238,Andhra Pradesh
tomato,2022,October,3645,Andhra Pradesh
tomato,2022,November,1760,Andhra Pradesh
tomato,2022,December,1452,Andhra Pradesh
tomato,2023,January,2291,Andhra Pradesh
tomato,2023,February,3490,Andhra Pradesh
tomato,2023,March,2111,Andhra Pradesh
tomato,2023,April,1637,Andhra Pradesh
tomato,2023,May,2950,Andhra Pradesh
tomato,2023,June,1342,Andhra Pradesh
tomato,2023,July,3435,Andhra Pradesh
tomato,2023,August,3866,Andhra Pradesh
tomato,2023,September,2835,Andhra Pradesh
tomato,2023,October,1550,Andhra Pradesh
tomato,2023,November,2232,Andhra Pradesh
tomato,2023,December,3081,Andhra Pradesh
tomato,2024,January,3776,Andhra Pradesh
tomato,2024,February,2974,Andhra Pradesh
tomato,2024,March,3797,Andhra Pradesh
tomato,2024,April,2125,Andhra Pradesh
tomato,2024,May,2326,Andhra Pradesh
tomato,2024,June,2338,Andhra Pradesh
tomato,2024,July,3023,Andhra Pradesh
tomato,2024,August,2064,Andhra Pradesh
tomato,2024,September,1593,Andhra Pradesh
tomato,2024,October,2815,Andhra Pradesh
tomato,2024,November,1797,Andhra Pradesh
tomato,2024,December,1657,Andhra Pradesh
potato,2020,January,2758,Andhra Pradesh
potato,2020,February,2631,Andhra Pradesh
potato,2020,March,2414,Andhra Pradesh
potato,2020,April,3426,Andhra Pradesh
potato,2020,May,1221,Andhra Pradesh
potato,2020,June,2458,Andhra Pradesh
potato,2020,July,2461,Andhra Pradesh
potato,2020,August,1049,Andhra Pradesh
potato,2020,September,1540,Andhra Pradesh
potato,2020,October,1274,Andhra Pradesh
potato,2020,November,1686,Andhra Pradesh
potato,2020,December,2050,Andhra Pradesh
potato,2021,January,3981,Andhra Pradesh
potato,2021,February,3863,Andhra Pradesh
potato,2021,March,1070,Andhra Pradesh
potato,2021,April,2870,Andhra Pradesh
potato,2021,May,2965,Andhra Pradesh
potato,2021,June,3116,Andhra Pradesh
potato,2021,July,2395,Andhra Pradesh
potato,2021,August,2169,Andhra Pradesh
potato,2021,September,3843,Andhra Pradesh
potato,2021,October,2811,Andhra Pradesh
potato,2021,November,3478,Andhra Pradesh
potato,2021,December,2407,Andhra Pradesh
potato,2022,January,2036,Andhra Pradesh
potato,2022,February,1081,Andhra Pradesh
potato,2022,March,3285,Andhra Pradesh
potato,2022,April,1647,Andhra Pradesh
potato,2022,May,3450,Andhra Pradesh
potato,2022,June,3368,Andhra Pradesh
potato,2022,July,2063,Andhra Pradesh
potato,2022,August,3422,Andhra Pradesh
potato,2022,September,3542,Andhra Pradesh
potato,2022,October,2318,Andhra Pradesh
potato,2022,November,2787,Andhra Pradesh
potato,2022,December,1117,Andhra Pradesh
potato,2023,January,1344,Andhra Pradesh
potato,2023,February,1326,Andhra Pradesh
potato,2023,March,1009,Andhra Pradesh
potato,2023,April,2961,Andhra Pradesh
potato,2023,May,2167,Andhra Pradesh
potato,2023,June,1844,Andhra Pradesh
potato,2023,July,1053,Andhra Pradesh
potato,2023,August,2923,Andhra Pradesh
potato,2023,September,3924,Andhra Pradesh
potato,2023,October,3158,Andhra Pradesh
potato,2023,November,1123,Andhra Pradesh
potato,2023,December,2351,Andhra Pradesh
potato,2024,January,3336,Andhra Pradesh
potato,2024,February,1688,Andhra Pradesh
potato,2024,March,1945,Andhra Pradesh
potato,2024,April,2756,Andhra Pradesh
potato,2024,May,2210,Andhra Pradesh
potato,2024,June,2531,Andhra Pradesh
potato,2024,July,1680,Andhra Pradesh
potato,2024,August,1487,Andhra Pradesh
potato,2024,September,2863,Andhra Pradesh
potato,2024,October,2100,Andhra Pradesh
potato,2024,November,3984,Andhra Pradesh
potato,2024,December,2531,Andhra Pradesh"""
        
        df = pd.read_csv(StringIO(data))
        return df, None
    except Exception as e:
        return None, f"Error loading dataset: {str(e)}"

@st.cache_data
def prepare_crop_data(df):
    """Prepare and cache crop-wise data"""
    crop_data = {}
    all_crops = df["Crop"].str.lower().unique()
    
    for crop in all_crops:
        crop_df = df[df["Crop"].str.lower() == crop].copy()
        crop_df["Date"] = pd.to_datetime(crop_df["Month"] + " " + crop_df["Year"].astype(str))
        crop_df.sort_values("Date", inplace=True)
        crop_df.set_index("Date", inplace=True)
        crop_df.rename(columns={"Average_Wholesale_Price (Rs/quintal)": "Price"}, inplace=True)
        
        if len(crop_df) > 0:
            crop_data[crop.title()] = {
                'data': crop_df,
                'time_series': crop_df["Price"],
                'data_points': len(crop_df),
                'date_range': f"{crop_df.index[0].strftime('%b %Y')} to {crop_df.index[-1].strftime('%b %Y')}",
                'latest_price': float(crop_df["Price"].iloc[-1]),
                'price_trend': crop_df["Price"].pct_change().iloc[-1] * 100 if len(crop_df) > 1 else 0,
                'avg_price': float(crop_df["Price"].mean()),
                'min_price': float(crop_df["Price"].min()),
                'max_price': float(crop_df["Price"].max())
            }
    
    return crop_data

def train_single_crop_model(crop_name, time_series, arima_order=(1,1,1)):
    """Train ARIMA model for a single crop"""
    try:
        model = ARIMA(time_series, order=arima_order)
        model_fit = model.fit()
        return model_fit, None
    except Exception as e:
        return None, str(e)

def generate_forecast(model_fit, steps=6):
    """Generate forecast using trained model"""
    try:
        forecast = model_fit.forecast(steps=steps)
        confidence_int = model_fit.get_forecast(steps=steps).conf_int()
        return forecast, confidence_int, None
    except Exception as e:
        return None, None, str(e)

def create_price_chart(crop_name, historical_data, forecast_data=None, confidence_intervals=None):
    """Create interactive price chart with forecast"""
    fig = go.Figure()
    
    # Historical data
    fig.add_trace(go.Scatter(
        x=historical_data.index,
        y=historical_data.values,
        mode='lines+markers',
        name='Historical Prices',
        line=dict(color='#2E8B57', width=3),
        marker=dict(size=6),
        hovertemplate='<b>%{x}</b><br>Price: ₹%{y:.2f}<extra></extra>'
    ))
    
    if forecast_data is not None:
        # Generate future dates
        last_date = historical_data.index[-1]
        forecast_dates = pd.date_range(
            start=last_date + pd.DateOffset(months=1),
            periods=len(forecast_data),
            freq='MS'
        )
        
        # Forecast line
        fig.add_trace(go.Scatter(
            x=forecast_dates,
            y=forecast_data,
            mode='lines+markers',
            name='Forecast',
            line=dict(color='#FF6B6B', width=3, dash='dash'),
            marker=dict(size=8, symbol='diamond'),
            hovertemplate='<b>%{x}</b><br>Forecast: ₹%{y:.2f}<extra></extra>'
        ))
        
        # Confidence intervals
        if confidence_intervals is not None:
            fig.add_trace(go.Scatter(
                x=forecast_dates,
                y=confidence_intervals.iloc[:, 0],
                mode='lines',
                line=dict(width=0),
                showlegend=False,
                hoverinfo='skip'
            ))
            
            fig.add_trace(go.Scatter(
                x=forecast_dates,
                y=confidence_intervals.iloc[:, 1],
                mode='lines',
                fill='tonexty',
                fillcolor='rgba(255, 107, 107, 0.2)',
                line=dict(width=0),
                name='Confidence Interval',
                hovertemplate='<b>%{x}</b><br>Upper: ₹%{y:.2f}<extra></extra>'
            ))
    
    fig.update_layout(
        title=f"Price Analysis for {crop_name}",
        xaxis_title="Date",
        yaxis_title="Price (₹/quintal)",
        hovermode='x unified',
        template='plotly_white',
        height=500,
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="right",
            x=1
        )
    )
    
    return fig

def display_crop_metrics(crop_info, forecast_data=None):
    """Display crop metrics in a nice format"""
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            "Current Price",
            f"₹{crop_info['latest_price']:.2f}",
            delta=None
        )
    
    with col2:
        trend_color = "normal" if abs(crop_info['price_trend']) < 5 else ("inverse" if crop_info['price_trend'] < 0 else "normal")
        st.metric(
            "Price Trend",
            f"{crop_info['price_trend']:.1f}%",
            delta=f"{crop_info['price_trend']:.1f}%",
            delta_color=trend_color
        )
    
    with col3:
        st.metric(
            "Data Points",
            crop_info['data_points']
        )
    
    with col4:
        if forecast_data is not None:
            next_price = forecast_data[0]
            price_change = ((next_price - crop_info['latest_price']) / crop_info['latest_price']) * 100
            st.metric(
                "Next Month Forecast",
                f"₹{next_price:.2f}",
                delta=f"{price_change:.1f}%"
            )

# Main application
def main():
    # Title
    st.markdown('<h1 class="main-header">🌾 Andhra Pradesh Crop Price Prediction</h1>', unsafe_allow_html=True)
    st.markdown("**Analyze and predict wholesale prices for various crops in Andhra Pradesh**")
    
    # Load dataset
    df, error = load_dataset()
    
    if error:
        st.error(f"❌ {error}")
        st.info("📁 Please check if the dataset is properly embedded in the code.")
        return
    
    st.success("✅ Dataset loaded successfully!")
    
    # Display basic dataset info
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Records", len(df))
    with col2:
        st.metric("Unique Crops", df["Crop"].nunique())
    with col3:
        st.metric("Date Range", f"{df['Year'].min()}-{df['Year'].max()}")
    
    # Prepare crop data
    with st.spinner("Processing crop data..."):
        crop_data = prepare_crop_data(df)
    
    # Sidebar for crop selection and parameters
    st.sidebar.header("🌱 Crop Selection")
    
    # Get available crops
    available_crops = list(crop_data.keys())
    available_crops.sort()
    
    selected_crop = st.sidebar.selectbox(
        "Choose a crop to analyze:",
        available_crops,
        help="Select a crop to view its price history and predictions"
    )
    
    # Model parameters
    st.sidebar.header("🔧 Model Parameters")
    forecast_months = st.sidebar.slider("Forecast Period (months)", 1, 12, 6)
    
    # ARIMA parameters
    with st.sidebar.expander("Advanced ARIMA Settings"):
        p = st.selectbox("AR order (p)", [0, 1, 2, 3], index=1)
        d = st.selectbox("Differencing (d)", [0, 1, 2], index=1)
        q = st.selectbox("MA order (q)", [0, 1, 2, 3], index=1)
    
    # Main content area
    if selected_crop:
        crop_info = crop_data[selected_crop]
        
        # Display crop information
        st.header(f"📊 {selected_crop} Price Analysis")
        
        col1, col2 = st.columns([2, 1])
        
        with col2:
            st.markdown(f"""
            <div class="crop-card">
                <h4>📈 Crop Information</h4>
                <p><strong>Date Range:</strong> {crop_info['date_range']}</p>
                <p><strong>Total Records:</strong> {crop_info['data_points']}</p>
                <p><strong>Latest Price:</strong> ₹{crop_info['latest_price']:.2f}/quintal</p>
                <p><strong>Average Price:</strong> ₹{crop_info['avg_price']:.2f}/quintal</p>
                <p><strong>Price Range:</strong> ₹{crop_info['min_price']:.2f} - ₹{crop_info['max_price']:.2f}/quintal</p>
            </div>
            """, unsafe_allow_html=True)
        
        # Check if enough data for modeling
        if crop_info['data_points'] < 6:
            st.warning(f"⚠️ Insufficient data for {selected_crop}. Need at least 6 data points for reliable predictions.")
            
            # Show available data
            fig = create_price_chart(selected_crop, crop_info['time_series'])
            st.plotly_chart(fig, use_container_width=True)
            return
        
        # Train model and generate forecast
        with st.spinner(f"Training ARIMA model for {selected_crop}..."):
            model_fit, model_error = train_single_crop_model(
                selected_crop, 
                crop_info['time_series'], 
                arima_order=(p, d, q)
            )
        
        if model_error:
            st.error(f"❌ Model training failed: {model_error}")
            # Show historical data only
            fig = create_price_chart(selected_crop, crop_info['time_series'])
            st.plotly_chart(fig, use_container_width=True)
            return
        
        # Generate forecast
        forecast_data, confidence_intervals, forecast_error = generate_forecast(
            model_fit, 
            steps=forecast_months
        )
        
        if forecast_error:
            st.error(f"❌ Forecast generation failed: {forecast_error}")
            return
        
        # Display metrics
        display_crop_metrics(crop_info, forecast_data)
        
        # Create and display chart
        fig = create_price_chart(
            selected_crop, 
            crop_info['time_series'], 
            forecast_data, 
            confidence_intervals
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # Forecast table
        st.subheader("📅 Detailed Forecast")
        
        # Generate future dates for display
        last_date = crop_info['time_series'].index[-1]
        future_dates = pd.date_range(
            start=last_date + pd.DateOffset(months=1),
            periods=forecast_months,
            freq='MS'
        )
        
        forecast_df = pd.DataFrame({
            'Month': [date.strftime('%B %Y') for date in future_dates],
            'Predicted Price (₹/quintal)': [f"₹{price:.2f}" for price in forecast_data],
            'Lower Bound': [f"₹{conf[0]:.2f}" for conf in confidence_intervals.values] if confidence_intervals is not None else ['N/A'] * len(forecast_data),
            'Upper Bound': [f"₹{conf[1]:.2f}" for conf in confidence_intervals.values] if confidence_intervals is not None else ['N/A'] * len(forecast_data)
        })
        
        st.dataframe(forecast_df, use_container_width=True)
        
        # Model statistics
        with st.expander("📊 Model Statistics"):
            col1, col2, col3 = st.columns(3)
            
            with col1:
                st.metric("AIC Score", f"{model_fit.aic:.2f}")
            with col2:
                st.metric("BIC Score", f"{model_fit.bic:.2f}")
            with col3:
                st.metric("Log Likelihood", f"{model_fit.llf:.2f}")
            
            st.write(f"**ARIMA Order:** ({p}, {d}, {q})")
            st.write(f"**Training Data:** {crop_info['data_points']} observations")
        
        # Historical data table
        with st.expander("📋 Historical Price Data"):
            historical_df = crop_info['data'].copy()
            historical_df.reset_index(inplace=True)
            historical_df['Date'] = historical_df['Date'].dt.strftime('%B %Y')
            st.dataframe(
                historical_df[['Date', 'Price']].rename(columns={'Price': 'Price (₹/quintal)'}),
                use_container_width=True
            )
        
        # Download forecast data
        if st.button("💾 Download Forecast Data"):
            csv_data = forecast_df.to_csv(index=False)
            st.download_button(
                label="📥 Download CSV",
                data=csv_data,
                file_name=f"{selected_crop.lower()}_price_forecast_{datetime.now().strftime('%Y%m%d')}.csv",
                mime="text/csv"
            )
    
    # Footer with crop overview
    st.sidebar.markdown("---")
    st.sidebar.subheader("📈 Quick Overview")
    
    # Show top 5 crops by latest price
    crop_prices = [(name, info['latest_price']) for name, info in crop_data.items()]
    crop_prices.sort(key=lambda x: x[1], reverse=True)
    
    st.sidebar.write("**Highest Priced Crops:**")
    for i, (crop, price) in enumerate(crop_prices[:5], 1):
        st.sidebar.write(f"{i}. {crop}: ₹{price:.2f}")
    
    st.sidebar.write("**Most Volatile Crops:**")
    volatile_crops = [(name, abs(info['price_trend'])) for name, info in crop_data.items()]
    volatile_crops.sort(key=lambda x: x[1], reverse=True)
    for i, (crop, volatility) in enumerate(volatile_crops[:5], 1):
        st.sidebar.write(f"{i}. {crop}: {volatility:.1f}%")

if __name__ == "__main__":
    main()
