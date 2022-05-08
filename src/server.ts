import { port } from './config/config';
import app from './app';

app
  .listen(port, () => {
   console.log(`server running on port : ${port}`);
  })
