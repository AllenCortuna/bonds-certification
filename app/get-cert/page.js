import connection from "@/config/db";

const GetCert = async () => {
  try {
    const [results, fields] = await connection.query("SELECT * FROM `cert`");
    return (
      <div className="width-full p-10 mt-5 flex justify-center flex-wrap gap-10">
        {results.map((result) => (
          <span className="font-bold text-md  border rounded-md text-black font-normal p-4 " key={result.id}>
            <h1>{result.contractNo}</h1>
            <p className="text-sm ">
              <b>description:</b> {result.content}
            </p>
          </span>
        ))}
      </div>
    );
  } catch (err) {
    console.log(err);
    return (
      <div>
        <h2>ERROR</h2>
        <p>{err}</p>
      </div>
    );
  }
};

export default GetCert;
