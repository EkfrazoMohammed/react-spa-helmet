import { useEffect, useState } from 'react';
import { API, baseURL } from './../api/apirequest'; // Adjust import path as needed
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom'; // Import useParams

const SinglePackages = () => {
    const { id } = useParams(); // Use useParams to get the route parameter
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(`/api/all-packages?populate=*&filters[package_id][$eq]=${id}`);
                setData(response.data.data[0]);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    // Fetch metadata dynamically from the API data
    const title = data.attributes.name || 'Package Details';
    const description = data.attributes.description || 'Default description';
    const imageUrl = `${baseURL}${data.attributes.package_images?.data?.[0]?.attributes?.url}`;
    const canonicalUrl = `${baseURL}/single-package/${id}`;
    const keywords = data.attributes.keywords || 'Travel, Package, Tourism'; // Update with relevant keywords if available

    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <link rel="canonical" href={canonicalUrl} />
                <meta name="robots" content="index, follow" />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
                
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={imageUrl} />
            </Helmet>
            <h1>Package Details</h1>
            <h2>{title}</h2>
            <p>{description}</p>
            <img 
                src={imageUrl} 
                alt={data.attributes.package_images?.data?.[0]?.attributes?.name || 'Package image'} 
                style={{ width: "200px", height: "200px" }}
            />
            <p><strong>Price:</strong> {data.attributes.Package_price}</p>
        </div>
    );
};

export default SinglePackages;
