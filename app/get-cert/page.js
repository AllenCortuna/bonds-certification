import connection from "@/config/db";

const GetCert = async () => {
  try {
    const [results, fields] = await connection.query("SELECT * FROM `cert`");
    console.log("click");
    const handleRefresh = () => {
      console.log("click");
    };
    return (
      <div className="width-full p-10 mt-5 flex justify-center flex-col gap-10">
        <div className="overflow-x-auto mx-auto ">
          <table className="table table-zebra table-pin-rows w-[50rem]">
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
                  <td className="text-zinc-600 flex align-start">
                    {result.contractNo}
                  </td>
                  <td className="max-w-[28rem] text-zinc-600">
                    {result.content}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-outline rounded-md text-zinc-500 text-sm mt-10 mx-auto"
          onClick={handleRefresh()}
        >
          Refresh
        </button>
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
