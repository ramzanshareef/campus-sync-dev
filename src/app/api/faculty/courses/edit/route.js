export async function POST(request) {
    let data = await request.json();
    console.log(data);
    return Response.json({ status: 200, message: "Course Updated Successfully" });
}