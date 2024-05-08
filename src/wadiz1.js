import axios from "axios";

async function fetchData() {
  try {
    const payload = {
      startNum: 0,
      order: "recommend",
      limit: 48,
      categoryCode: "",
      endYn: "",
    };

    const headers = {
      "Content-Type": "application/json", // JSON 형식으로 데이터를 전송함을 명시
      // 다른 헤더 필요 시 여기에 추가
    };

    const response = await axios.post(
      "https://service.wadiz.kr/api/search/funding",
      payload,
      { headers }
    );

    // 응답에서 데이터 추출
    const data = response.data;

    // 추출한 데이터를 처리하거나 반환합니다.
    return data.data.list;
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    throw error;
  }
}

// fetchData 함수 호출
fetchData()
  .then((data) => {
    console.log("Fetched data:", data);
    // 데이터 처리 또는 다른 작업 수행
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });