import React, { useEffect, useState } from 'react';

import notification from '../../../hooks/useNotification'

import { Table, Tag } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

import New from './New'
import Button from '../../Button'

const colors = {
    Vegetable: 'green',
    Vegan: 'lime',
    Vegetarian: 'green',
    "Gluten Free": 'blue',
    Meat: 'volcano',
    Cheese: 'gold',
    Seafood: 'blue',
    "Whole Wheat": 'orange'
}

export default ({ getData, type, upsert }) => {
    const [data, setData] = useState([])
    const [filters, setFilters] = useState(null)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            width: 125
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 100
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: 200,
            filters: [
                {
                    text: 'Types',
                    value: 'Types',
                    children: [
                        {
                            text: 'Meat',
                            value: 'Meat',
                        },
                        {
                            text: 'Vegetable',
                            value: 'Vegetable',
                        },
                        {
                            text: 'Cheese',
                            value: 'Cheese',
                        },
                        {
                            text: 'Seafood',
                            value: 'Seafood',
                        },
                    ],
                },
                {
                    text: 'Characteristics',
                    value: 'Characteristics',
                    children: [
                        {
                            text: 'Gluten Free',
                            value: 'Gluten Free',
                        },
                        {
                            text: 'Vegetarian',
                            value: 'Vegetarian',
                        },
                        {
                            text: 'Vegan',
                            value: 'Vegan',
                        },
                    ],
                },
            ],
            render: (tags) => (
                <>
                    {tags.map(tag => (
                        <Tag color={`${colors[tag.name]}`}>{tag.name}</Tag>
                    ))}
                </>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 300
        },
        {
            title: 'Actions',
            render: () => (
                <span>
                    <Button
                        type="link"
                        content={<EditFilled />}
                        tooltip="Edit"
                    />
                    <Button
                        type="link"
                        content={<DeleteFilled />}
                        tooltip="Delete"
                    />
                </span>
            ),
            width: 150
        },
    ]

    useEffect(() => {
        (async () => {
            const response = await getData()

            if(response.success){
                setData(response.sides)
            } else {
                notification({
                    title: 'Error',
                    type: 'error',
                    message: `There was an error fetching the ${type}`
                })
            }
        })()
    }, [getData, type])

    return (
        <>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    padding: '0 30px 0 0'
                }}
            >
                <New
                type={`${type.charAt(0).toUpperCase()}${type.substring(1, type.length - 1)}`}
                    upsert={upsert}
                />
            </div>

            <Table
                columns={columns}
                dataSource={
                    filters === null || filters.tags === null ?
                        data
                        :
                        data.filter((row) => {
                            return filters.tags.every(tag => {
                                return row.tags.filter(rowTag => rowTag.name === tag).length > 0
                            })
                        })
                    }
                pagination={false}
                onChange={async (pagination, newFilters) => { setFilters(newFilters) }}
            />
        </>
    );
}