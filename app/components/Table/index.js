import styled from "styled-components";
import React from 'react';

const TableWrapper = styled.table`
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    border: 1px  solid #f5f5f5;
    table-layout : fixed;
    td, th {
        text-align: left;
        padding: 8px 20px;
    }
    thead{
        tr {
            background: #f5f5f5;
            color: #000;
            border-bottom : 2px solid #ececec;
        }
    }
    tbody{
        tr {
            &:nth-child(even) {
                background-color: #f9f9f9;
            }
        }
        td {
            width: 400px;
            p{
                margin : 0;
                color: #000;
                white-space: no-wrap;
                overflow : hidden;
                text-overflow : ellipsis;
            }
            &.firstname, &.lastname, &.agency_name{
                p{
                    text-transform: capitalize;
                }
            }
        }
    }
`;


const ThWrapper = styled.th`
`;

const TrWrapper = styled.tr`
`;

const TdWrapper = styled.td`
`;

const Table = function (props) {
    const { headers, contacts } = props;
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <TableWrapper>
                            <thead>
                                <tr>
                                    {
                                        Object.keys(headers).map((key) => {
                                            const singeHeader = headers[key];
                                            return <th key={key} width={singeHeader.width + '%'}>{singeHeader.name}</th>;
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contacts.map((contact, i) => {
                                        return (
                                            <tr key={i}>
                                            {
                                                Object.keys(headers).map((columnKey) => {
                                                    const cell = contact[columnKey];
                                                    return (<td className={columnKey} key={columnKey}>
                                                                { (columnKey != "number") ? 
                                                                        <p>{(cell && cell != "NULL") ?  contact[columnKey] : "-"}</p> 
                                                                        : 
                                                                        (i+1)
                                                                }
                                                            </td>);
                                                })
                                            }
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </TableWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
}


const Th = function () {

}

const Tr = function () {

}


const Td = function () {

}


export default Table