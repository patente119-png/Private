import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "POST only"
    });
  }

  try {
    const { ingredients } = req.body;

    const prompt = `
너는 한국 집밥 요리 전문가다.

사용자가 가진 재료:
${ingredients}

사용자가 가진 재료를 최대한 활용해서 서로 다른 집밥 메뉴 3개를 추천해줘.

반드시 아래 형식 그대로 작성해.
JSON, 코드블록, 따옴표, 대괄호는 절대 쓰지 마.

====================
메뉴명:
분류:
조리시간:
난이도:
필요 재료:

상세 조리법:
1.
2.
3.
4.
5.

요리 팁:
====================

====================
메뉴명:
분류:
조리시간:
난이도:
필요 재료:

상세 조리법:
1.
2.
3.
4.
5.

요리 팁:
====================

====================
메뉴명:
분류:
조리시간:
난이도:
필요 재료:

상세 조리법:
1.
2.
3.
4.
5.

요리 팁:
====================
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    return res.status(200).json({
      recipe: response.output_text
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message || "레시피 생성 실패"
    });
  }
}
