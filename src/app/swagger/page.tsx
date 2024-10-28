'use client';
import { useEffect, useState } from "react";
import Loading from "@/component/loading";
import { useRouter } from "next/navigation";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css";
import spec from './spec.json';

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            setLoading(false);
        }

        fetch();
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <div id="container">
                <div id="contents">
                    <div className="inner">
                        <div className="customcol-box mb20"> 
                            <div className="col-md-12" >                        
                                <div className="card-con card-con-reset">
                                    <div className="tab_container">
                                        <div className="tab_content">
                                            <SwaggerUI 
                                                // url="/swagger-json"
                                                // url={'https://petstore.swagger.io/v2/swagger.json'}
                                                spec={spec}
                                            />
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}