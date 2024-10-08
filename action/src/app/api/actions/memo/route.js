import {ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse, MEMO_PROGRAM_ID} from "@solana/actions"
import { clusterApiUrl, ComputeBudgetInstruction, ComputeBudgetProgram, Connection,Keypair,  PublicKey, Transaction, TransactionInstruction, SystemProgram,LAMPORTS_PER_SOL } from "@solana/web3.js";

import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Program, BN, AnchorProvider} from '@project-serum/anchor';

const API_URL = "https://9c9f1t91-8080.inc1.devtunnels.ms";

function USD2SOL(price){
    return price*0.66
}

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

    let payPerView = apiResponse.type == 'ppv'; 
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

const programId = new PublicKey('4e18RDf2EUkYciY7rLKU6wytfZEBruXXhDfE79LSpbuc');

const idlString = JSON.stringify({
    "address": "4e18RDf2EUkYciY7rLKU6wytfZEBruXXhDfE79LSpbuc",
    "metadata": {
        "name": "counter",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
        "name": "send_sol",
        "discriminator": [
            214,
            24,
            219,
            18,
            3,
            205,
            201,
            179
        ],
        "accounts": [
            {
            "name": "recipient",
            "writable": true
            },
            {
            "name": "system_program",
            "address": "11111111111111111111111111111111"
            },
            {
            "name": "signer",
            "writable": true,
            "signer": true
            }
        ],
        "args": [
            {
            "name": "amount",
            "type": "u64"
            }
        ]
        }
    ],
    "errors": [
        {
        "code": 6000,
        "name": "TransferFailed",
        "msg": "transfer failed"
        }
    ]
    });
    const idl = JSON.parse(idlString);
    

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

        
    

        

        let apiResponse = await getBlinkById(pid);
        
        let subscribed = false;

        subscribed = apiResponse.creator.subscribers.some(subscriber => subscriber.walletAddress === account);

        let imagePaid = apiResponse.premiumImage
        let titlePaid = apiResponse.premiumTitle
        let contentPaid = apiResponse.premiumContent
        let price = apiResponse.price
        let imageUnPaid = apiResponse.image
        let creatorWallet=apiResponse.creator.walletAddress
        let subscriptionPrice=apiResponse.creator.subscriptionPrice
        let payPerView = apiResponse.type == 'ppv'; 
        


        if (pay == 1) {
            let amount1;
            if(payPerView){
                amount1=price
            }else{
                amount1=subscriptionPrice
            }
            amount1=USD2SOL(amount1)

            //let amount2=0.3
            const transaction=new Transaction()

            transaction.feePayer = account
            const connection = new Connection(clusterApiUrl("devnet"))
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
            
            const instructionData1 = Buffer.alloc(4 + 8); 
            instructionData1.writeUInt32LE(2, 0);
            instructionData1.writeBigUInt64LE(BigInt(amount1 * LAMPORTS_PER_SOL), 4);
            
            const transferInstruction1 = new TransactionInstruction({
            keys: [
                { pubkey: account, isSigner: true, isWritable: true },
                { pubkey: creatorWallet, isSigner: false, isWritable: true },
            ],
            programId: SystemProgram.programId,
            data: instructionData1,
            });
            //const instructionData2 = Buffer.alloc(4 + 8); 
            //instructionData2.writeUInt32LE(2, 0);
            //instructionData2.writeBigUInt64LE(BigInt(amount2 * LAMPORTS_PER_SOL), 4);
            
            //const transferInstruction2 = new TransactionInstruction({
            //keys: [
            //    { pubkey: account, isSigner: true, isWritable: true },
            //    { pubkey: '5azNmbuv4jJbuGPZUEjZq98rxn2PBjaYUnsTfE5ov43R', isSigner: false, isWritable: true },
            //],
            //programId: SystemProgram.programId,
            //data: instructionData2,
            //});

            transaction.add(
                transferInstruction1
            )
            //transaction.add(
            //    transferInstruction2
            //)

            //const transaction=new Transaction()

            // let wallet = new NodeWallet(new Keypair());
            // const connection = new Connection(clusterApiUrl("devnet"))
            // const provider = new AnchorProvider(connection, wallet);

            // const program = new Program(
            //     idl ,
            //     programId,
            //     provider
            // );
            
            // const amountLamports = parseFloat(1) * LAMPORTS_PER_SOL;

            // const tx =  program.transaction.sendSol(new BN(amountLamports), {
            //     accounts: {
            //     signer: account,
            //     recipient: creatorWallet,
            //     system_program: SystemProgram.programId,
            //     },
            // });
            // transaction.add(tx)
            //transaction.feePayer = account
            //transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
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
            const transaction=new Transaction()

    
            transaction.feePayer = account
            const connection = new Connection(clusterApiUrl("devnet"))
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
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