import app from "./server";
import env from "../env";

app.listen(env.PORT, () => console.log(`Server running on post ${env.PORT}`));
