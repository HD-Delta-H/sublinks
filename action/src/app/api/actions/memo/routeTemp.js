import {ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse, MEMO_PROGRAM_ID } from "@solana/actions"
import { Connection, PublicKey, Keypair, SystemProgram, LAMPORTS_PER_SOL, clusterApiUrl, ComputeBudgetInstruction, ComputeBudgetProgram, Transaction, TransactionInstruction } from "@solana/web3.js";

import { Program, BN, AnchorProvider} from '@project-serum/anchor';

export const GET=(req)=>{
    let cid=(new URL(req.url).searchParams).get("cid");
    let pid=(new URL(req.url).searchParams).get("pid");
    let payload;



    // Get following using cid and pid
    let payPerView=true; 
    let creatorName="Harshit"
    let imageUnPaid=new URL("/favicon.ico",new URL(req.url).origin).toString()
    let titleUnPaid=`${creatorName}'s Premium Content`
    let contentUnPaid=`This is a premium content. In order to view the content you must be subscribed to ${creatorName}. Please click verify to verify your subscription or purchase one`
    let subscriptionPrice = 10; // s
    let price = 10; // s


    if(payPerView){
        payload={
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
    }else{
        payload={
            icon: imageUnPaid,
            label:"Verify",
            description:contentUnPaid,
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

export const OPTIONS=GET;

const programId = new PublicKey('4e18RDf2EUkYciY7rLKU6wytfZEBruXXhDfE79LSpbuc');
// class Wallet {
//     constructor(publicKey) {
//         this.publicKey = publicKey;
//     }
  
//     get publicKey() {
//         return this.publicKey;
//     }
// }

// function GetProvider(connection, wallet) {
//     try {
//       const provider = new AnchorProvider(connection, wallet, {
//         preflightCommitment: 'processed',
//       });
  
//       console.log('Provider created successfully.');
//       return provider;
//     } catch (err) {
//       console.error('Error setting up provider:', err);
//       return null;
//     }
// }

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

async function createTransferTransaction(amountSol, walletPublicKey, connection, programId, account) {
    try {
      const amountLamports = parseFloat(amountSol) * LAMPORTS_PER_SOL;
  
    //   const provider = GetProvider(connection, wallet);
    //   if (!provider) {
    //     throw new Error('Provider Not Set');
    //   }
  
      const program = new Program(idl, programId);
  
      const tx = await program.transaction.sendSol(new BN(amountLamports), {
        accounts: {
          signer: account,
          recipient: walletPublicKey,
          system_program: SystemProgram.programId,
        },
      });
  
    //   const latestBlockHash = await provider.connection.getLatestBlockhash();
    //   tx.recentBlockhash = latestBlockHash.blockhash;
    //   tx.feePayer = provider.wallet.publicKey;
  
      console.log('Transaction Created: ', tx);
      return tx;
    } catch (err) {
      console.error('Error creating transaction: ', err);
    }
}


export const POST = async (req)=>{
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
        const connection=new Connection(clusterApiUrl("devnet"))

        
        // TODO: Get the toWalletPubKey from the database
        const toWalletPubKey = new PublicKey('5azNmbuv4jJbuGPZUEjZq98rxn2PBjaYUnsTfE5ov43R');
        const toWalletPubKey2 = new PublicKey('GUfJqzU2GLnWZJsMv1DkHCW31uxCw2P4K1pBAu5qYWND');

        // const wallet = new Wallet(account);

        // Get below conditions from Mongo
        let subscribed=false; // (can be per post or overall)

        // Get below data using pid and cid
        let imagePaid="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg"
        let titlePaid="premium title"
        let contentPaid="premium content "
        let price = 10;//price of subscription only
        let imageUnPaid=new URL("/favicon.ico",new URL(req.url).origin).toString()


        if(pay==1){
            const transaction=new Transaction()
            //Pay Transaction goes Here
            const contractTx = await createTransferTransaction(0.2, toWalletPubKey, connection, programId, account);
            const contractTx2 = await createTransferTransaction(0.02, toWalletPubKey2, connection, programId, account);
            transaction.add(contractTx);
            transaction.add(contractTx2);
            // const latestBlockHash = await provider.connection.getLatestBlockhash();
            // transaction.recentBlockhash = latestBlockHash.blockhash;
            // transaction.feePayer = provider.wallet.publicKey;
            transaction.feePayer=account
            transaction.recentBlockhash=(await connection.getLatestBlockhash()).blockhash

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
            const transaction=new Transaction()

            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: account,
                    toPubkey: 'GUfJqzU2GLnWZJsMv1DkHCW31uxCw2P4K1pBAu5qYWND',
                    lamports: 0.02 * LAMPORTS_PER_SOL
                }),
            )

            transaction.add(
                new TransactionInstruction({
                    programId:new PublicKey(MEMO_PROGRAM_ID),
                    data:Buffer.from("Verifying...","utf-8"),
                    keys:[],
                })
            )
            transaction.feePayer=account
            transaction.recentBlockhash=(await connection.getLatestBlockhash()).blockhash

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
    } catch(err) {
        console.log(err)
        return Response.json(err,{status:400,headers:ACTIONS_CORS_HEADERS})
    }
}