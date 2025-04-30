import { AppBar } from "@/components/AppBar";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@civic/auth-web3/react";

export const Account = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen h-full flex-col flex items-center bg-gray-50 w-full">
      <div className="w-full">
        <AppBar/>
      </div>
    
      {!user ? (
        <Card className="mt-12 px-32 py-12">
          Loading...
        </Card>
      ) : (
        <div className="container mx-auto px-4 py-8 max-w-[800px]">
          <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
            <Card>
              <CardContent>
                <div className="space-y-4 flex mt-8 gap-10 items-center justify-center">
                  <img src={user?.picture} alt="Profile" className="mt-3 w-32 h-32 rounded-full" />
                  <div className="flex flex-col gap-4 w-full">
                    <div className="space-y-1.5">
                      <label className="text-sm text-gray-500" htmlFor="name">Name</label>
                      <Input
                        id="name"
                        value={user?.name}
                        disabled
                        className="text-black"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm text-gray-500" htmlFor="email">Email</label>
                      <Input id="email" value={user?.email} disabled />
                    </div>

                  </div>
                </div>
              </CardContent>
            </Card>
            {JSON.stringify(user)}

            <Card>
              <CardContent>
                <div className="space-y-4 flex mt-8 gap-10 items-center justify-center">
                  <img src={user?.picture} alt="Profile" className="mt-3 w-32 h-32 rounded-full" />
                  <div className="flex flex-col gap-4 w-full">
                    <div className="space-y-1.5">
                      <label className="text-sm text-gray-500" htmlFor="name">Name</label>
                      <Input
                        id="name"
                        value={user?.name}
                        disabled
                        className="text-black"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm text-gray-500" htmlFor="email">Email</label>
                      <Input id="email" value={user?.email} disabled />
                    </div>

                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle>Wallet</CardTitle>
                <CardDescription>Manage your SOL on Mainnet and Devnet</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="mainnet">
                  <TabsList className="w-min">
                    <TabsTrigger value="mainnet">Mainnet</TabsTrigger>
                    <TabsTrigger value="devnet">Devnet</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mainnet">
                    <div className="flex flex-col gap-5 mt-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label htmlFor="balance" className="text-sm font-medium text-gray-500">Balance</label>
                          <div className="text-3xl font-bold">{tokensMain} SOL</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          aria-label="Refresh balance"
                          onClick={refreshBalance}
                        >
                          <BiRefresh className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="transfer" className="text-md font-medium text-gray-500">Transfer</label>
                        <div className="space-y-2">
                          <Input
                            placeholder="Enter Address to Send Tokens to..."
                            value={inputMain}
                            onChange={(e) => setInputMain(e.target.value)}
                          />
                          <div className="flex space-x-2">
                            <Input
                              type="number"
                              placeholder="Enter Quantity..."
                              value={quantityMain}
                              onChange={(e) => setQuantityMain(e.target.value)}
                              min="0"
                              max={tokensMain.toString()}
                            />
                            <Button onClick={() => handleTokenTransfer('mainnet')}>Send</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="devnet">
                    <div className="flex flex-col gap-5 mt-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label htmlFor="balance" className="text-sm font-medium text-gray-500">Balance</label>
                          <div className="text-3xl font-bold">{tokensDev} SOL</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          aria-label="Refresh balance"
                          onClick={refreshBalance}
                        >
                          <BiRefresh className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="transfer" className="text-md font-medium text-gray-500">Transfer</label>
                        <div className="space-y-2">
                          <Input
                            placeholder="Enter Address to Send Tokens to..."
                            value={inputDev}
                            onChange={(e) => setInputDev(e.target.value)}
                          />
                          <div className="flex space-x-2">
                            <Input
                              type="number"
                              placeholder="Enter Quantity..."
                              value={quantityDev}
                              onChange={(e) => setQuantityDev(e.target.value)}
                              min="0"
                              max={tokensDev.toString()}
                            />
                            <Button onClick={() => handleTokenTransfer('devnet')}>Send</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card> */}
          </div>
        </div>
      )}
    </div>
  );
}; 