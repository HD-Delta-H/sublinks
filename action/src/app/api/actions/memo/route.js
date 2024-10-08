import {ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse, MEMO_PROGRAM_ID} from "@solana/actions"
import { clusterApiUrl, ComputeBudgetInstruction, ComputeBudgetProgram, Connection, PublicKey, Transaction, TransactionInstruction, SystemProgram } from "@solana/web3.js";

const API_URL = "http://localhost:8080";

const getBlinkById = async (id) => {
    let apiResponse;
    const externalApiUrl = `${API_URL}/blinks/${id}`;
    const response = await fetch(externalApiUrl);
    if (!response.ok) {
        return null;
    }
    apiResponse = await response.json();
    // console.log(apiResponse);
    console.log(apiResponse.creator.subscribers)
    return apiResponse;
}

export const GET = async (req) => {
    let cid=(new URL(req.url).searchParams).get("cid");
    let pid=(new URL(req.url).searchParams).get("pid");

    let apiResponse = await getBlinkById(pid);
    
    let payload;

    let payPerView = apiResponse.type != 'ppv'; 
    let creatorName = apiResponse.creator.name
    let imageUnPaid = apiResponse.image
    let titleUnPaid =  apiResponse.title
    let contentUnPaid= apiResponse.content
    let subscriptionPrice = apiResponse.creator.subscriptionPrice
    let price = apiResponse.price


    if (payPerView) {
        payload = {
            icon: imageUnPaid,
            label:"Verify",
            description:contentUnPaid,
            title: titleUnPaid,
            links:{
                actions:[
                    {
                        label:`View Once for $${price}`,
                        href:`/api/actions/memo?cid=${cid}&pid=${pid}&pay=1`
                    }
                ]
            }
        }
    } else {
        payload = {
            icon: imageUnPaid,
            label: "Verify",
            description: contentUnPaid,
            title: titleUnPaid,
            links:{
                actions:[
                    {
                        label:"Verify Subscription",
                        href:`/api/actions/memo?cid=${cid}&pid=${pid}`
                    },
                    {
                        label:`Subscribe for $${subscriptionPrice}`,
                        href:`/api/actions/memo?cid=${cid}&pid=${pid}&pay=1`
                    }
                ]
            }
        }
    }


    return Response.json(payload,{
        headers:ACTIONS_CORS_HEADERS
    })
}

export const OPTIONS = GET;

export const POST = async (req) => {
    try{
        let cid = (new URL(req.url).searchParams).get("cid");
        let pid = (new URL(req.url).searchParams).get("pid");
        let pay = (new URL(req.url).searchParams).get("pay");

        const body = await req.json()
        let account,payload;

        try{
            account = new PublicKey(body.account)
        } catch (err) {
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
            // SystemProgram.transfer({
            //     fromPubkey: account.publicKey,
            //     toPubkey: to,
            //     lamports: 0.0001 * LAMPORTS_PER_SOL
            // }),
            // SystemProgram.transfer({
            //     fromPubkey: account.publicKey,
            //     toPubkey: to,
            //     lamports: 0.0001 * LAMPORTS_PER_SOL
            // }),
            
            new TransactionInstruction({
                programId:new PublicKey(MEMO_PROGRAM_ID),
                data:Buffer.from("Verifying...","utf-8"),
                keys:[],
            })
        )

        transaction.feePayer = account
        const connection = new Connection(clusterApiUrl("devnet"))
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
    
        let apiResponse = await getBlinkById(pid);
        
        let subscribed = false;

        subscribed = apiResponse.creator.subscribers.some(subscriber => subscriber.walletAddress === account);

        let imagePaid = apiResponse.premiumImage
        let titlePaid = apiResponse.premiumTitle
        let contentPaid = apiResponse.premiumContent
        let price = apiResponse.price
        let imageUnPaid = apiResponse.image
                

        if (pay == 1) {
            payload = await createPostResponse({
                fields:{
                    transaction,
                    message:"hi",
                    links:{
                        next:{
                            type:"inline",
                            action:{
                                icon: imagePaid,
                                description: contentPaid,
                                title: titlePaid,
                                label: "Payment Successful",
                                disabled: true
                            }
                        }
                    }
                }
            })
        } else {
            if (subscribed) {
                payload = await createPostResponse({
                    fields:{
                        transaction,
                        message:"hi",
                        links:{
                            next:{
                                type: "inline",
                                action:{
                                    icon: imagePaid,
                                    description: contentPaid,
                                    title: titlePaid,
                                    label: "Subscribed",
                                    disabled: true
                                }
                            }
                        }
                    }
                })
            } else {
                payload = await createPostResponse({
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
    } catch (err) {
        console.error(err)
        return Response.json(err,{status:400,headers:ACTIONS_CORS_HEADERS})
    }
}