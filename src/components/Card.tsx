import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';

export const UserCard = (props: { username: string; message : string ;key:number;isBot : boolean;isLoading? : boolean}) => {
  return (
    <>


{ props.isLoading ?<>
      <div
      key ={props.key}
        className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white text-black mt-4"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-1.5 px-6 ">
          <div className="flex items-center space-x-2">
          <Typography variant="h3" className='w-screen'><Skeleton /></Typography>
          </div>
        </div>
        <div className="px-6">
          <p>
          <Skeleton height={200}/>
          </p>
        </div>
      </div>
</> : <>
      <div
      key ={props.key}
        className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white text-black mt-4"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">{props.isBot ? "🤖 KraxBot" : "User"}</h3>
          </div>
        </div>
        <div className="p-6">
          <p>
           {props.message || "KraxBot is Trained on English Prompts So please use Proper English or Try again Later" }
          </p>
        </div>
      </div>
</>
}



    </>
  );
};

export const BotCard = (props: { response: string |undefined }) => {
  return (
    <>
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm mt-4 bg-white text-black"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">🤖 KraxBot</h3>
          </div>
        </div>
        <div className="p-6">
          <p>
           {props.response  || "How can I help you today?" }
          </p>
        </div>
      </div>
    </>
  );
};
