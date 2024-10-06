import {ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse, MEMO_PROGRAM_ID} from "@solana/actions"
import { clusterApiUrl, ComputeBudgetInstruction, ComputeBudgetProgram, Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";


export const GET=(req)=>{
    let cid=(new URL(req.url).searchParams).get("cid");
    let pid=(new URL(req.url).searchParams).get("pid");


    // Get creator name from cid and pid
    let name="Harshit"
    let imageUnPaid="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg"
    let titleUnPaid="premium title"
    let contentUnPaid="premium title"

    const payload={
        icon: new URL("/favicon.ico",new URL(req.url).origin).toString(),
        label:"Verify",
        description:`This is a premium content. In order to view the content you must be subscribed to ${name}. Please click verify to verify your subscription or purchase one`,
        title:`${name}'s Premium Content`,
    }

    return Response.json(payload,{
        headers:ACTIONS_CORS_HEADERS
    })
}

export const OPTIONS=GET;

export const POST=async (req)=>{
    try{
        let cid=(new URL(req.url).searchParams).get("cid");
        let pid=(new URL(req.url).searchParams).get("pid");
        const body=await req.json()
        let account,payload;
        try{
            account=new PublicKey(body.account)
        }catch(err){
            return new Response("Invalid User Account",{
                status:400,
                headers:ACTIONS_CORS_HEADERS
            })
        }

        const transaction=new Transaction()
        transaction.add(
            ComputeBudgetProgram.setComputeUnitPrice({
                microLamports:1000,
            }),
            new TransactionInstruction({
                programId:new PublicKey(MEMO_PROGRAM_ID),
                data:Buffer.from("Verifying...","utf-8"),
                keys:[],
            })
        )
        transaction.feePayer=account
        const connection=new Connection(clusterApiUrl("devnet"))
        transaction.recentBlockhash=(await connection.getLatestBlockhash()).blockhash

        // if Account is in subscriber's list of cid
        if(true){
            // Get all the below using cid and pid
            let imagePaid="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg"
            let titlePaid="premium title"
            let contentPaid="premium content "

            payload=await createPostResponse({
                fields:{
                    transaction,
                    message:"hi",
                    links:{
                        next:{
                            type:"inline",
                            action:{
                                icon: imagePaid,
                                description:contentPaid,
                                title:titlePaid,
                                label:"Subscribed",
                                disabled:true
                            }
                        }
                    }
                }
            })

        }else{
            //Pay Transaction
            payload=await createPostResponse({
                fields:{
                    transaction,
                    message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    links:{
                        next:{
                            type:"inline",
                            action:{
                                icon: "https://fileinfo.com/img/ss/xl/jpg_44-2.jpg",
                                label:"send memo",
                                description:"hello2",
                                title:"Memo 2",
                            }
                        }
                    }
                }
            })
        }

        return Response.json(payload,{headers:ACTIONS_CORS_HEADERS})
    }catch(err){
        return Response.json(err,{status:400,headers:ACTIONS_CORS_HEADERS})
    }
}