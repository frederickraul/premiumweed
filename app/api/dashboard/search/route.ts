import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';


interface IParams {
    quoteId?: string;
  }

  export async function POST(
    request: Request,
    { params }: { params: IParams }
  
  ) {
    // const currentUser = await getCurrentUser();
    // if(!currentUser){
    //   return NextResponse.error();
    // }
  
    const body = await request.json();
  
    const {
      filterName
    } = body;

      const filter = (filterName).replaceAll("(", "").replaceAll(")","");
      
      let listings = await prisma.listing.findMany({
        where:{
                OR:[
                  { 
                    title: {
                              contains: filter,      
                              mode: 'insensitive', // Default value: default
                            }
                  },
                  { 
                    address: {
                              contains: filter,      
                              mode: 'insensitive', // Default value: default
                              }
                  },
                  { 
                    phone: {
                              contains: filter,      
                              mode: 'insensitive', // Default value: default
                              }
                  },
                  { 
                    website: {
                              contains: filter,      
                              mode: 'insensitive', // Default value: default
                              }
                  },
                 
                ]
        }, 
        });

        
        if(listings.length<1){
          // Search by Phone Number
          const rawPhone = (filter).replaceAll("+", "").replaceAll("-","").replaceAll(" ","").replaceAll(" ","");
          
          listings = await prisma.listing.findMany({
            where:{ 
              phone: {
                contains: rawPhone,      
                mode: 'insensitive', // Default value: default
              }
              
            }, 
          });
        }

        const SafeListings = listings.map((item) => ({
          title: item?.title,
          category: item?.category,
          type: 'Listing',
          photo: item?.coverSrc,
          url: 'listings/'+item?.id,
          subtitle: item?.address ||'' + item?.city || '' +item?.stateCode || '',
          timestamp: Date.parse(item.createdAt.toISOString()),
         }));
        
     

         const products = await prisma.product.findMany({
          where:{
                  OR:[
                    { 
                      title: {
                                contains: filter,      
                                mode: 'insensitive', // Default value: default
                              }
                    },
                  
                  ]
          }, 
          });

          const SafeProducts = products.map((item) => ({
            title: item?.title,
            category: item?.category,
            type: 'Product',
            photo: item?.coverSrc,
            subtitle: item.category,
            url: 'products/'+item?.id,

            timestamp: Date.parse(item.createdAt.toISOString()),
           }));

           const users = await prisma.user.findMany({
            where:{
                  AND:[
                    {
                      OR:[
                        {role: 'Regular'},
                        {role: 'Seller'},
                      ]  
                    }

                  ],
                    OR:[
                      { 
                        fullName: {
                                  contains: filter,      
                                  mode: 'insensitive', // Default value: default
                                }
                      },
                      { 
                        email: {
                                  contains: filter,      
                                  mode: 'insensitive', // Default value: default
                                }
                      },
                    
                    ]
            }, 
            });
  
            const SafeUsers = users.map((item) => ({
              title: item?.fullName,
              category: '',
              type: item?.role,
              photo: item?.image,
              subtitle: item?.email,
              url: 'users/'+item?.id,
              timestamp: Date.parse(item.createdAt.toISOString()),
             }));
  
  



          const SafeElement = Object.assign(SafeListings, SafeProducts, SafeUsers );

              
    
      return NextResponse.json(SafeElement);

         
    }
  
 
  
  
  