import {ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse, MEMO_PROGRAM_ID} from "@solana/actions"
import { clusterApiUrl, ComputeBudgetInstruction, ComputeBudgetProgram, Connection, PublicKey, Transaction, TransactionInstruction, SystemProgram,LAMPORTS_PER_SOL } from "@solana/web3.js";


export const GET=(req)=>{
    let cid=(new URL(req.url).searchParams).get("cid");
    let pid=(new URL(req.url).searchParams).get("pid");
    let payload;



    // Get following using cid and pid
    let payPerView=false; 
    let creatorName="Harshit"
    let imageUnPaid=new URL("/favicon.ico",new URL(req.url).origin).toString()
    let titleUnPaid=`${creatorName}'s Premium Content`
    let contentUnPaid=`This is a premium content. In order to view the content you must be subscribed to ${creatorName}. Please click verify to verify your subscription or purchase one`
    let price = 10; //price of payPerVew only



   
    if(payPerView){
        payload={
            icon: imageUnPaid,
            label:"Proceed & Pay",
            description:"The following content can be only be viewed once, after successful payment.",
            title:`Subscription Price : $${price}`,
            links:{
                actions:[{
                    label:"Proceed & Pay",
                    href:`/api/actions/memo?cid=${cid}&pid=${pid}&pay=1`
                }]
            }
        }
    }else{
        payload={
            icon: imageUnPaid,
            label:"Verify",
            description:contentUnPaid,
            title: titleUnPaid,
        }
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
        let pay=(new URL(req.url).searchParams).get("pay");
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
        console.log(LAMPORTS_PER_SOL)
        transaction.add(
            ComputeBudgetProgram.setComputeUnitPrice({
                microLamports:1000,
            }),
            SystemProgram.transfer({
                fromPubkey: account,
                toPubkey: "5azNmbuv4jJbuGPZUEjZq98rxn2PBjaYUnsTfE5ov43R",
                lamports: 0.0001 * LAMPORTS_PER_SOL
            }),
        )
        transaction.feePayer=account
        const connection=new Connection(clusterApiUrl("devnet"))
        transaction.recentBlockhash=(await connection.getLatestBlockhash()).blockhash



        // Get below conditions from Mongo
        let subscribed=true; // (can be per post or overall)

        // Get below data using pid and cid
        let imagePaid="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg"
        let titlePaid="premium title"
        let contentPaid="premium content "
        let price = 10;//price of subscription only
        let imageUnPaid=new URL("/favicon.ico",new URL(req.url).origin).toString()
                



        if(pay==1){
            //Pay Transaction goes Here
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
                                label:"Payment Successful",
                                disabled:true
                            }
                        }
                    }
                }
            })
        }else{
            if(subscribed){
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
                payload=await createPostResponse({
                    fields:{
                        transaction,
                        message:"Not Paid",
                        links:{
                            next:{
                                type:"inline",
                                action:{
                                    icon: imageUnPaid,
                                    label:"Proceed & Pay",
                                    description:"The following content can be only be accessed after successful payment.",
                                    title:`Subscription Price : $${price}`,
                                    links:{
                                        actions:[{
                                            label:"Proceed & Pay",
                                            href:`/api/actions/memo?cid=${cid}&pid=${pid}&pay=1`
                                        }]
                                    }
                                }
                            }
                        }
                    }
                })
            }
            
        }
        return Response.json(payload,{headers:ACTIONS_CORS_HEADERS})
    }catch(err){
        return Response.json(err,{status:400,headers:ACTIONS_CORS_HEADERS})
    }
}