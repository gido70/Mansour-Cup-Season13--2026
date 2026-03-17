async function testConnection() {
  const box = document.getElementById("supabase-test-box");
  if (!box) return;

  box.innerHTML = "جاري تحميل الفرق...";

  const { data, error } = await supabaseClient
    .from("teams")
    .select("name");

  if (error) {
    console.error("❌ خطأ:", error);
    box.innerHTML = "حدث خطأ في جلب الفرق";
    return;
  }

  console.log("✅ البيانات:", data);

  box.innerHTML = `
    <div style="background:#0b1d3a;color:white;padding:15px;border-radius:12px;margin:20px 0;">
      <h3 style="margin-bottom:10px;">الفرق القادمة من Supabase</h3>
      <ul style="margin:0;padding-right:18px;">
        ${data.map(team => `<li>${team.name}</li>`).join("")}
      </ul>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", testConnection);
