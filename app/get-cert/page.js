import connection from "@/config/db";

const GetCert = async () => {
  try {
    const [results, fields] = await connection.query("SELECT * FROM `cert`");
    return (
      <div className="width-full p-10 mt-5 flex justify-center flex-wrap gap-10">
        <div className="overflow-x-auto">
          <table className="table table-zebra table-pin-rows">
            {/* head */}
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th className="text-md font-bold">Contract ID</th>
                <th className="text-md font-bold">Content</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  {/* <td className="">{result.id}</td> */}
                  <td className="text-zinc-700 flex align-start">{result.contractNo}</td>
                  <td className="text-wrap max-w-[28rem] text-zinc-600">{result.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
