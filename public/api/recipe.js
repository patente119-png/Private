export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "POST only"
    });
  }

  const { ingredients } = req.body;

  try {

    const recipe = `
======================

메뉴명: ${ingredients} 볶음

분류: 집밥

조리시간: 15분

난이도: 초보

재료:
${ingredients}

조리법:

1. 재료를 손질한다.
2. 팬에 넣고 볶는다.
3. 간을 맞춘다.
4. 맛있게 먹는다.

======================
`;

    res.status(200).json({
      recipe
    });

  } catch (error) {

    res.status(500).json({
      error: "서버 오류"
    });

  }
}
